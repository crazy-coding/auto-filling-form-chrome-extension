import { useEffect, useState } from "react";

const SuggestedLink = ({ folder, setLinks, links, removeMode }) => {
  const [openAddLinkForm, setOpenAddLinkForm] = useState(false);

  const removeFolder = () => {
    setLinks(links.filter((fold) => folder.title !== fold.title));
  }

  const removeLink = (newLink) => {
    setLinks(links.map((fold) => {
      if (folder.title === fold.title) {
        return { ...fold, list: fold.list.filter((link) => link !== newLink) };
      } else {
        return fold;
      }
    }))
  }

  const AddLinkForm = () => {
    const [title, setTitle] = useState('');
    const [url, setURL] = useState('');
    const [description, setDescription] = useState('');

    const addLink = () => {
      setLinks(links.map((link) => {
        if (folder.title === link.title) {
          if (folder.list.length > 0) {
            return { ...link, list: [ ...link.list, { title, url, description } ] };
          } else {
            return { ...link, list: [ { title, url, description } ] }
          }
        } else {
          return link;
        }
      }))
    }

    const closeAddLinkForm = (callback) => {
      setOpenAddLinkForm(false);
      callback();
    }
    
    return openAddLinkForm && <div className="AddLinkForm widget-form">
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>URL:</label>
      <input value={url} onChange={(e) => setURL(e.target.value)} />
      <label>Description:</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="submit-buttons">
        <button onClick={() => closeAddLinkForm(() => addLink())}>Submit</button>
        <button onClick={() => closeAddLinkForm(() => setOpenAddLinkForm(false))}>Cancel</button>
      </div>
    </div>
  }

  return (
    <div className="SuggestedLinksFolder" key={`${folder.title} 1`}>
      <div className="SLFolderTitle">
        <h5>{folder.title}</h5>
        {!removeMode && <button className="borderless-btn" onClick={() => setOpenAddLinkForm(true)}>+</button>}
        {removeMode && <button className="borderless-btn" onClick={() => removeFolder()}>x</button>}
      </div>
      <AddLinkForm />
      <ul className="SuggestedLinksList">
        {folder.list.map((link) => <li key={link.title}>
            <a href={link.url} title={`${link.title} - ${link.description}`}>{link.title}</a>
            {removeMode && <button className="borderless-btn" onClick={() => removeLink(link)}>x</button>}
          </li>)}
      </ul>
    </div>
  )
}

const SuggestedLinks = ({ func, ...props }) => {
  const { meta } = props;

  const [links, setLinks] = useState(meta.links);
  const [openAddFolderForm, setOpenAddFolderForm] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);

  const addFolder = (folderName) => {
    setLinks([ ...meta.links, { title: folderName, list: [] } ]);
  }

  useEffect(() => {
    func.wUpdate({ ...props, meta: { links } })
  }, [links])

  const closeAddFolderForm = (callback) => {
    setOpenAddFolderForm(false);
    callback();
  }

  const AddFolderForm = () => {
    const [folderName, setFolderName] = useState('');
    
    return openAddFolderForm && <div className="AddFolderForm widget-form">
      <label>Title:</label>
      <input value={folderName} onChange={(e) => setFolderName(e.target.value)} />

      <div className="submit-buttons">
        <button onClick={() => closeAddFolderForm(() => addFolder(folderName))}>Submit</button>
        <button onClick={() => closeAddFolderForm(() => setOpenAddFolderForm(false))}>Cancel</button>
      </div>
    </div>
  }

  return <div className="WidgetComponent SuggestedLinks">
    <div className="content">
      {links.map((folder) => <SuggestedLink folder={folder} links={links} setLinks={setLinks} removeMode={removeMode} />)}
    </div>
    <AddFolderForm />
    <div className="AddFolderButton">
      <button onClick={() => setOpenAddFolderForm(true)}>+</button>
      <button onClick={() => setRemoveMode(!removeMode)}>x</button>
    </div>
  </div>
}

export default SuggestedLinks;