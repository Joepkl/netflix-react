/** Vendor */
import { useState, useEffect, useRef } from "react";

/** Local */
import { MovieCreditsType } from "@/helpers/api/movies/types.ts";

/** Blocks */
import { Button } from "@/components/ui/Button.tsx";

/** Component */
const MovieCast = ({ credits }: { credits: MovieCreditsType }) => {
  const castMembers = credits.cast.slice(0, 10);
  const castString = castMembers.map((item) => item.name).join(", ");
  const director = credits.crew.find((item) => item.known_for_department === "Directing");
  const castStringRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleShowAll = () => {
    setIsTruncated(!isTruncated);
  };

  /** Effects */
  useEffect(() => {
    if (castStringRef.current) {
      // More than 1 line or more than max width.
      if (castStringRef.current.offsetHeight > 24) {
        setIsTruncated(true);
      } else {
        setIsTruncated(castStringRef.current.offsetWidth > 380);
      }
    }
  }, []);

  /** Markup */
  return (
    <section className="flex-col gap-2 text-grey-light">
      <div className="flex gap-2">
        <p ref={castStringRef} className={isTruncated ? "truncate max-w-[380px]" : ""}>
          Cast: {castString}.
        </p>
        {isTruncated && <Button onClick={handleShowAll} text="more" variant="tertiary" />}
      </div>

      {director && <p className={isTruncated ? "" : "mt-4"}>Director: {director.name}</p>}
    </section>
  );
};

export { MovieCast };
