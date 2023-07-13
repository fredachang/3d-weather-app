interface Props {
  loadingText: string;
}

export function Loading(props: Props) {
  const { loadingText } = props;
  return (
    <div className="absolute flex justify-center items-center w-full h-full z-20">
      <p className="text-3xl text-lime-300">{loadingText}</p>
    </div>
  );
}
