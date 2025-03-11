const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

// Want to figure out how to structure your query?
// Go download GraphiQL and enter the URL in the fetch call below!
// (just don't forget to add the authorization header)
// From here, you'll be able to explore all of the existing content
// https://www.electronjs.org/apps/graphiql
export async function fetchContent(query: string) {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      },
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem retrieving entries with the query ${query}`);
    console.error(error);
  }
};

export async function getFeaturedProjects() {
  try {
    const projects = await fetchContent(`
  {
    projectCollection(limit: 3, where: {featuredOnHomePage: true}) {
      items {
        photo {
          url
          description
        }
        name
        tags
        description {
          json
        }
        link
      }
    }
  }
  `);

    if (!projects) {
      throw new Error('No data received')
    }
    return projects.projectCollection.items

  } catch (error) {
    console.error('Error in getFeaturedProjects', error);
  }
};

export async function getExecMembers() {
  const execMembers = await fetchContent(`
  {
    executiveBoardMemberCollection(order: title_DESC) {
      items {
        name
        title
        description {
          json
        }
        photo {
          url
        }
        linkedIn
        email
      }
    }
  }
  `);

  console.log(execMembers)
  return execMembers.executiveBoardMemberCollection.items
};

