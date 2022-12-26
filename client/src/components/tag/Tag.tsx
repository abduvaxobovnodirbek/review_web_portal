import Chip from "@mui/material/Chip";

export default function Tag({ label }: { label: string }) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return <Chip label={label} onClick={handleClick} />;
}
