type CardProps = {
  title: string;
  authors: string;
  description?: string; // Optional description
  thumbnail?: string; // Optional thumbnail URL
  publisher: string;
  publisherDate?: string;
  onAdd?: () => void;
};

const Card: React.FC<CardProps> = ({ title, authors, description, thumbnail, publisher, publisherDate, onAdd }) => {
  return (
    <div className="mx-auto mb-6 bg-white rounded-lg border-solid border-2 overflow-hidden max-w-5xl m-4">
      <div className="md:flex">
        {/* Book-like thumbnail styling */}
        {thumbnail && (
          <div className="md:shrink-0 flex items-center justify-center p-4">
            <img
              className="object-cover rounded"
              src={thumbnail}
              alt={`Thumbnail of ${title}`}
              style={{ height: '200px', width: 'auto' }} // Book-like dimensions
            />
          </div>
        )}
        <div className="p-8 flex-1">
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {title}
            <span> by {authors}</span>
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-slate-600">
            {publisher}
            {publisherDate && <span> | {publisherDate}</span>}
          </div>
          {description && <p className="mt-2 text-sm text-slate-800">{description}</p>}
          {onAdd && (
            <button onClick={onAdd} className="mt-4 bg-customDarkGreen hover:bg-customGreen text-sm font-medium text-white py-2 px-4 rounded">
              Add to my books
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
