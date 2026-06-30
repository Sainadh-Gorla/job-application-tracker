import { useState, useEffect } from "react";

const WP_API_URL = "http://job-tracker.local/wp-json/wp/v2/posts?_embed&per_page=5";

function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export default function CareerTipsFeed() {
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function fetchTips() {
      try {
        const res = await fetch(WP_API_URL);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          setTips(data);
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    fetchTips();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="tips-feed" aria-labelledby="tips-feed-heading">
      <h2 id="tips-feed-heading" className="tips-feed__heading">
        Career tips
      </h2>

      {status === "loading" && (
        <p className="tips-feed__status" role="status">
          Loading career tips...
        </p>
      )}

      {status === "error" && (
        <p className="tips-feed__status tips-feed__status--error" role="alert">
          Couldn't load career tips right now. Make sure your local WordPress
          site is running.
        </p>
      )}

      {status === "success" && tips.length === 0 && (
        <p className="tips-feed__status">
          No career tips published yet.
        </p>
      )}

      {status === "success" && tips.length > 0 && (
        <ul className="tips-feed__list">
          {tips.map((post) => (
            <li key={post.id} className="tips-feed__item">
              <h3 className="tips-feed__title">{post.title.rendered}</h3>
              <p className="tips-feed__excerpt">
                {stripHtml(post.excerpt.rendered)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}