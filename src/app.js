import { useEffect } from 'react';
import { useState } from 'react';
import Header from './components/header';
import { Email } from './components/email.component';

import { initialEmails } from './data/emails';

import './styles/app.css';

const App = () => {
  const [emails, setEmails] = useState(initialEmails);
  const [currentPage, setCurrentPage] = useState('inbox');
  const [currentDisplay, setCurrentDisplay] = useState(emails);
  const [hideReadOn, setHideReadOn] = useState(false);

  const toggleRead = (targetEmail) =>
    setEmails(
      emails.map((email) =>
        email === targetEmail ? { ...email, read: !email.read } : email
      )
    );

  const toggleStarred = (targetEmail) =>
    setEmails(
      emails.map((email) =>
        email === targetEmail ? { ...email, starred: !email.starred } : email
      )
    );

  const toggleHideRead = () => setHideReadOn(!hideReadOn);

  const getUnreadEmails = (emailList) =>
    emailList.filter((email) => !email.read);

  const getStarredEmails = () => emails.filter((email) => email.starred);

  useEffect(() => {
    const pageRender = {
      inbox: [...emails],
      starred: getStarredEmails(),
    };

    setCurrentDisplay(
      hideReadOn
        ? getUnreadEmails(pageRender[currentPage])
        : pageRender[currentPage]
    );
  }, [hideReadOn, currentPage, emails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active" onClick={() => setCurrentPage('inbox')}>
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li className="item" onClick={() => setCurrentPage('starred')}>
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails().length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideReadOn}
              onChange={() => toggleHideRead()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {currentDisplay.map((email) => (
            //   <Email
            //   key={email.id}
            //   email={email}
            //   toggleRead={toggleRead}
            //   toggleStarred={toggleStarred}
            // />
            <li
              key={email.id}
              className={`email ${email.read ? 'read' : 'unread'}`}
            >
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
