import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const useAdminTools = () => {
  const { user } = useContext(UserContext);
  const [flagged_posts, setFlaggedPosts] = useState(null);

  const getFlaggedPosts = () => {
    axios
      .get(
        `https://quick-api-9c95.onrender.com/administration/administrator/${user.uid}/flagged`
      )
      .then((response) => {
        if (response.status === 200) {
          setFlaggedPosts(response.data);
        }
      });
  };

  useEffect(() => {
    getFlaggedPosts();
  }, []);

  return {
    flagged_posts,
  };
};

export default useAdminTools;
