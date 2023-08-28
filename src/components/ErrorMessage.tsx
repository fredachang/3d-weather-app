import { motion } from "framer-motion";
import { fade } from "../motion";

interface Props {
  text: string;
  delay: number;
  duration: number;
}

export function Message(props: Props) {
  const { text, delay, duration } = props;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fade(duration, delay)}
      className="absolute flex justify-center items-center w-100 h-20 z-20"
    >
      <p className="text-lg md:text-2xl text-lime-300">{text}</p>
    </motion.div>
  );
}
