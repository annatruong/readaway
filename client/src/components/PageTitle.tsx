type PageTitleProps = {
  title: string;
  flex?: string;
};

function PageTitle({ title, flex }: PageTitleProps) {
  return (
    <div className="mt-2 mb-2">
      <h1 className={`${flex} px-4 text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight`}>{title}</h1>
    </div>
  );
}

export default PageTitle;
