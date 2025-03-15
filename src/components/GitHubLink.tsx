import Image from "next/image";

const GitHubLink = () => {
  return (
    <a
      href="https://github.com/justinmcbride/react-pig-latin-translator"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-10"
    >
      <Image
        src="/github-mark-white.svg"
        alt="GitHub"
        width={40}
        height={40}
        priority
      />
    </a>
  );
};

export { GitHubLink };
