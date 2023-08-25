interface Props {
  errorText: string;
}

export function ErrorMessage(props: Props) {
  const { errorText } = props;

  return (
    <div className="absolute flex justify-center items-center w-100 h-20 z-20">
      <p className="text-2xl text-lime-300">{errorText}</p>
    </div>
  );
}
