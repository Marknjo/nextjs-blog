export default function UserPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  console.log('Only runs on the server side!');

  return {
    props: {
      id: 'Current User ID: ' + params.uid,
    },
  };
}
