/** Blocks */
import { Heading } from "@/components/ui/Heading.tsx";

/** Type */
type Top10BlockType = {
  ranking: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  category?: string;
};

/** Component */
const Top10Block = ({ ranking, category }: Top10BlockType) => {
  return (
    <div className="flex gap-2 items-center mb-5">
      <div className="flex flex-col bg-red-main px-2 w-fit py-1 rounded text-center font-semibold">
        <p className="text-xs mb-[-7px]">TOP</p>
        <p>10</p>
      </div>
      <Heading type="h2" styling="h6">
        No. {ranking} in <span className="capitalize font-size-inherit">{category}</span> Today
      </Heading>
    </div>
  );
};

export { Top10Block };
