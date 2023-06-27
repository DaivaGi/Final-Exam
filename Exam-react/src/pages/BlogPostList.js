import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';


export function BlogPostListPage() {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogPosts = async () => {
    fetch("/api/v1/menus")
      .then((response) => response.json())
      .then((jsonResponse) => setBlogPosts(jsonResponse));
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div>
      
      <table className="mt-5">
        <tbody>
          {blogPosts.map((blogPost) => (
            
            <tr key={blogPost.id} >
              <td className="pe-5">{blogPost.createdDate}</td>              
              <td className="pe-5"><h5>{blogPost.title}</h5></td>
              {/* <td>{blogPost.text}</td> */}
              <td>
                <Link className="text-decoration-none text-muted" to={"menus/view/" + blogPost.id}>
                  Skaityti...
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
