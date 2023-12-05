interface Props {
  title: "text";
}

export const TitleProperty = ({ title }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="h-4 w-4 bg-green-500"></div>
      <p>{title}</p>
    </div>
  );
};
