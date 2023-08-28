interface Props {
  text: string;
}

export function Message(props: Props) {
  const { text } = props;

  return (
    <div className="absolute flex justify-center items-center w-100 h-20 z-20">
      <p className="text-lg md:text-2xl text-lime-300">{text}</p>
    </div>
  );
}
