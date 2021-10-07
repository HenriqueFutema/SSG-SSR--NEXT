import client from "../apollo-client";
import { gql } from '@apollo/client';

export default function Home({ data }) {
  console.log(data)
  return (
    <div style={{ padding: '20px' }}>
      <h2>Informes</h2>
      <ul>
        {data.informesCollection.items.map(item => (
          <li key={item.sys.id}>{item.titulo}</li>
        ))}
      </ul>
    </div>
  )
}

// SSG
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query queyInformes {
      informesCollection {
        items {
          titulo
          sys {
            id
          }
        }
      }
    }
    `,
  });
  console.log(data)

  return {
    props: {
      data,
    },
    revalidate: 100
 };
}

// SSR

// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: gql`
//     query queyInformes {
//       informesCollection {
//         items {
//           titulo
//           sys {
//             id
//           }
//         }
//       }
//     }
//     `,
//   });
//   console.log(data)

//   return {
//     props: {
//       data,
//     }
//  };
// }
