declare module 'react-typed' {
  interface TypedProps {
    strings: string[];
    typeSpeed?: number;
    loop?: boolean;
    // Add other props if needed
  }

  const Typed: React.FC<TypedProps>;

  export default Typed;
}
