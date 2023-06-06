interface Props {
  city: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleClick: () => void;
}

export function SearchBar(props: Props) {
  const { city, handleChange, handleClick } =
    props;

  return (
    <form>
      <input
        onChange={handleChange}
        type="text"
        value={city}
        placeholder="Enter City"
      />
      <button onClick={handleClick}>
        Search
      </button>
    </form>
  );
}
