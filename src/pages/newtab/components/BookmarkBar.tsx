import { useEffect, useState } from "react";

const faviconURL = (u) => {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "16");
  return url.toString();
}

const BookmarkItem = ({ id, title, url }) => (
  <a className="BookmarkItem" href={url} id={`bookmark-${id}`} title={title}>
    <img alt="" src={faviconURL(url)} />
    <span>{title.slice(0, 10)}</span>
  </a>
);

const BookmarkBar = () => {
  const [bookmarks, setBookmarks] = useState([]);
    
  const getBookmarks = async () => {
    const bookmarkTree = await chrome.bookmarks.getTree();
    setBookmarks(bookmarkTree[0].children[0].children);
  }

  useEffect(() => {
    getBookmarks()
  }, []);
  
    return <div className="BookmarkBar">
      {bookmarks.map((item) => <BookmarkItem {...item} key={item.id} />)}
    </div>
}

export default BookmarkBar;