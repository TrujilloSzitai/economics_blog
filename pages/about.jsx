import React, { useState, useEffect } from "react";
import { getAboutContent } from "../services/index";
import { RichText } from "@graphcms/rich-text-react-renderer";

const about = ({ about }) => {
  /*     const router = useRouter();

    if (router.isFallback) {
      return <Loader />;
    } */

  const [content, setContent] = useState([]);
  useEffect(() => {
    getAboutContent().then((newContent) =>
      setContent(newContent.content.raw.children)
    );
  }, []);

  console.log(content);

  return (
    <div className="w-9/12 bg-white mx-auto rounded-lg shadow-lg p-8 lg:px-16 mb-8">
      {/*       {content.map((obj, index) => {
        const children = obj.children.map((item, itemIndex) =>
          getContentFragment(itemIndex, item.text, item)
        );
        return getContentFragment(index, children, obj, obj.type);
      })} */}
      <RichText
        content={content}
        renderers={{
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

          bold: ({ children }) => <strong>{children}</strong>,
        }}
      />
    </div>
  );
};

export default about;
