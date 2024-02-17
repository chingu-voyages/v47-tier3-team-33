import { Request, Response } from 'express';
import NotificationModel from '../models/Notification';
import { getPendingNotifications, io } from '../server';
import mongoose from 'mongoose';

export const getAllNotification = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const notifications = await NotificationModel.find({ userId });
    res.status(200).json(notifications);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const { status } = req.body;

    const existingNotification = await NotificationModel.findById(
      notificationId
    );
    if (!existingNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await NotificationModel.findByIdAndUpdate(notificationId, { status });

    res.status(200).json({ message: 'Notification updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;

    const removedNotification = await NotificationModel.findByIdAndDelete(
      notificationId
    );

    if (!removedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification removed successfully' });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, message, type } = req.body;

    const newNotification = new NotificationModel({ userId, message, type });
    await newNotification.save();

    io.emit('getNotification', newNotification);

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getNotificationByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const allNotifications = await NotificationModel.find();

    const userNotifications = allNotifications.filter(
      (notification) => notification?.userId !== userId
    );

    res.status(200).json(userNotifications);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserPendingNotifications = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.userId;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const pendingNotifications = await getPendingNotifications(userId);
    // Handle and send response with pendingNotifications
    res.status(200).json(pendingNotifications);
  } catch (error) {
    console.error('Error handling notification request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};