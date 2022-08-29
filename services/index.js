import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/* Obtener la información de todos los posts */
export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              pfp {
                url
              }
            }
            slug
            title
            createdAt
            excerpt
            thumbnail {
              url
            }
          }
        }
      }
      categories {
        name
        slug
      }
    }
  `;
  try {
    const response = await request(graphqlAPI, query);
    return response.postsConnection.edges;
  } catch (err) {
    console.log(err);
  }
};

/* Obtener toda la información de los posts para su lectura */
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        thumbnail {
          url
        }
        author {
          name
          bio
          pfp {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  try {
    const response = await request(graphqlAPI, query, { slug });
    return response.post;
  } catch (err) {
    console.log(err);
  }
};

/* Mostrar los posts más recientes */
export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts(){
      posts(
        orderBy: createdAt_DESC
        last: 5
        ){
          title
          thumbnail {
            url
          }
          createdAt
          slug
        }
    }
  `;
  try {
    const response = await request(graphqlAPI, query);
    return response.posts;
  } catch (err) {
    console.log(err);
  }
};

/* Relacionar posts */
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 5
      ) {
        title
        thumbnail {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const response = await request(graphqlAPI, query, { slug, categories });
    return response.posts;
  } catch (err) {
    console.log(err);
  }
};

/* Obtener todas las categorías */
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories(orderBy: name_ASC) {
        name
        slug
      }
    }
  `;

  try {
    const response = await request(graphqlAPI, query);
    return response.categories;
  } catch (err) {
    console.log(err);
  }
};

/* Filtrar posts por categoría */
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              pfp {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            thumbnail {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges;
  } catch (err) {
    console.log(err);
  }
};

/* Subir comentario a la DB */
export const submitComment = async (comment) => {
  try {
    const result = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};

/* Obtener todos los comentarios de un post */
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  try {
    const response = await request(graphqlAPI, query, { slug });
    return response.comments;
  } catch (err) {
    console.log(err);
  }
};

/* Obtener los posts destacados */
export const getFeaturedPosts = async () => {
  const query = gql`
      query getFeaturedPosts() {
        posts(
          orderBy: createdAt_DESC
          where: {featuredPost: true}
          ) {
          author {
            name
            pfp {
              url
            } 
          }
          thumbnail {
            url
          }
          title
          slug
          createdAt
        }
      }
    `;

  try {
    const response = await request(graphqlAPI, query);
    return response.posts;
  } catch (err) {
    console.log(err);
  }
};

/* Obtener los posts adyacentes en relación a la fecha de publicación -beta- */
export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        thumbnail {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        thumbnail {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug, createdAt });
    return { next: result.next[0], previous: result.previous[0] };
  } catch (err) {
    console.log(err);
  }
};
