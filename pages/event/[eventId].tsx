import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

// TODO: complete this page (and use the other APIs here)
// upon clicking on an event item, the user is redirected to this page
// it displays the event details and much more

const Event: NextPage = () => {
  const router = useRouter();

  return <div>{router.query.eventId}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Event;
