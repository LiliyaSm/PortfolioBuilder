import { server } from "../../config";
import { Portfolio } from "../../types";
import nextCookie from "next-cookies";
import { withAuthSync, redirectOnError } from "../../utils/auth";

export default function Portfolios({ portfolio }: { portfolio: Portfolio }) {
  return (
    <>
      <h2>Edit the Portfolio</h2>
      <div>
        <h3>{portfolio.name}</h3>
        {/* <p>{post.content}</p> */}
        <hr />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const apiUrl = `${server}/api/portfolios/${id}`;

  const { token } = nextCookie(context);

  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(apiUrl, {
    headers,
  });
  const portfolio = await response.json();

  console.log(portfolio);

  return {
    props: {
      portfolio,
    },
  };
}

// export const getStaticPaths = async (ctx: {
//   req?: { headers: { cookie?: string | undefined } } | undefined;
// }) => {
//   const { token } = nextCookie(ctx);
//   const apiUrl = `${server}/api/portfolios`;

//   return {
//     paths: [{ params: { id: "14" } }],
//     fallback: false,
//   };

//   const response = await fetch(apiUrl, {
//     credentials: "include",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log(ctx);

//   if (response.ok) {
//     const portfolios = await response.json();

//     const ids = portfolios.map((portfolio: Portfolio) => portfolio.id);
//     const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));
//     return {
//       paths,
//       fallback: false,
//     };
//   } else {
//     // return await redirectOnError(ctx);
//   }
// };
