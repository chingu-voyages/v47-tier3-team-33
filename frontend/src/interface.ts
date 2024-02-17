export interface ICategory {
	_id: string;
	name: string;
}

export interface IEvent {
	_id: string;
	title: string;
	category: string;
	startDate?: Date;
	endDate?: Date;
	location: string;
	organizer?: string;
	description: string;
	image: string;
	attendees?: [];
	venue: string;
	tickets: {
		type: string;
		price: number;
		_id?: string;
	}[][];
}

export interface ITicket {
	type: string;
	price: number;
}
