import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { PostAdrift, PostCard } from "../components";
import { FeaturedPosts } from "../sections";
import { getPosts } from "../services";

interface Props {
  posts: any;
}

const Home: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>Wilde</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: any) => (
            <PostCard key={post.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostAdrift />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const posts = (await getPosts()) || [];
    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
