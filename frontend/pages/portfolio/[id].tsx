import { server } from "../../config";
import { Portfolio } from "../../types";

export default function Portfolios({ portfolio }: { portfolio: Portfolio }) {
  return (
    <>
      <h2>The Portfolio</h2>
      <div>
        <h3>{portfolio.name}</h3>
        {/* <p>{post.content}</p> */}
        <hr />
      </div>
    </>
  );
}

export async function getStaticProps() {
  //   const token = localStorage.getItem("token");
  const token =
    "NA.iQ4uYK2nbE9enpJnvH1kVaSP4oW9Ymv2m4NmHlMLAU3rjM5EDQreJqMEOm7k";
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(`${server}/api/portfolio/[id]`, {
    headers,
  });
  const portfolio = await response.json();

  console.log(response);

  return {
    props: {
      portfolio,
    },
  };
}

export const getStaticPaths = async () => {
  //   const token = localStorage.getItem("token");
  const token =
    "NA.iQ4uYK2nbE9enpJnvH1kVaSP4oW9Ymv2m4NmHlMLAU3rjM5EDQreJqMEOm7k";
  const headers = { Authorization: `Bearer ${token}` };
  const response = await fetch(`${server}/api/portfolios`, {
    headers,
  });

  const portfolios = await response.json();

  const ids = portfolios.map((portfolio: Portfolio) => portfolio.id);
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
