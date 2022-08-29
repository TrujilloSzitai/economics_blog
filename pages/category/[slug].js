import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";

const PostsPerCategory = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-lg lg:p-8 p-12 mb-8">
              <div className="relative overflow-hidden mb-6">
                <img
                  src="/assets/img/page-not-found.svg"
                  alt="Aún no hay artículos publicados"
                  className="object-top h-full w-full"
                />
              </div>
              <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
                ¡Ups! Parece que aún no se han publicado artículos en esta
                categoría.
              </h1>
            </div>
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostsPerCategory;

// Fetch data at build time
export async function getStaticProps({ params }) {
  try {
    const posts = await getCategoryPost(params.slug);
    return {
      props: { posts },
    };
  } catch (err) {
    console.log(err);
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  try {
    const categories = await getCategories();
    return {
      paths: categories.map(({ slug }) => ({ params: { slug } })),
      fallback: false,
    };
  } catch (err) {
    console.log(err);
  }
}
