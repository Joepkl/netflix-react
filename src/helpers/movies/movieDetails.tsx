const renderMovieCertification = ({ certification }: { certification: string }) => {
  const certificationText = certification === "0" ? "AL" : certification;
  return (
    <p className="rounded-full text-center text-sm aspect-square w-[32px] bg-black-main  p-1 font-semibold border-2 border-white-main">
      {certificationText}
    </p>
  );
};

const renderMovieDuration = ({ runtime }: { runtime: number }) => {
  const minutes = runtime % 60;
  const hours = (runtime - minutes) / 60;
  return `${hours}h ${minutes}m`;
};

const formatReleaseDate = ({ releaseDate }: { releaseDate: Date }) => {
  return releaseDate.toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export { renderMovieCertification, renderMovieDuration, formatReleaseDate };
