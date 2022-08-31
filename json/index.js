export const renderzr = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl font-semibold mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-2xl font-semibold mb-4">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mb-4">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-lg font-semibold mb-4">{children}</h6>
    ),
    p: ({ children }) => <p className="mb-8 text-sm md:text-base lg:text-lg">{children}</p>,
    a: ({ children, href, title}) => <a className="mb-8 text-md text-blue-600 hover:text-blue-900" href={href} target='_blank' title={title}>{children}</a>,
    img: ({ src, title, width, height, altText }) => (
      <img
          src={src}
          title={title}
          width={(width ? width : 512)}
          height={(height ? height : 350)}
          altText={altText}
          className="mx-auto"
      />
    ),

    bold: ({ children }) => <strong className="text-sm md:text-base lg:text-lg">{children}</strong>,
    underline: ({ children }) => <ins className="text-sm md:text-base lg:text-lg">{children}</ins>,
    italic: ({ children }) => <i className="text-sm md:text-base lg:text-lg">{children}</i>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    ul: ({ children }) => <ul className="text-sm md:text-base lg:text-lg ml-4">{children}</ul>,
    ol: ({ children }) => <ol className="text-sm md:text-base lg:text-lg ml-4">{children}</ol>,
    li: ({ children }) => <li className="text-sm md:text-base lg:text-lg">{children}</li>,
  };