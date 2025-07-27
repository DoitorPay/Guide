import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({
  type = "default",
  icon1 = "center-focus-strong",
  icon2,
  icon1OnClick,
  icon2OnClick,
  title,
}) {
  const [pageTitle, setPageTitle] = useState(title || "Title");
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      setPageTitle(title);
      return;
    }

    setPageTitle(document.title || "Title");

    const observer = new MutationObserver(() => {
      if (!title) {
        setPageTitle(document.title || "Title");
      }
    });

    observer.observe(document.querySelector("title"), {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }, [title]);

  const handleIconClick = (icon, customHandler) => {
    if (icon === "arrow-left") {
      return () => navigate(-1);
    }
    return customHandler;
  };

  return (
    <header className="cmp-header">
      <nav>
        {type === "header-b" && (
          <>
            <div className="mid-title">
              <div className="back-button">
                <i
                  onClick={() => navigate(-1)}
                  className="ico"
                  style={{
                    background: "url(/icons/arrow-left.svg) no-repeat center center",
                  }}
                ></i>
              </div>
            </div>
            <div className="back">
              <span className="logo__title">{pageTitle}</span>
            </div>
          </>
        )}

        {(type === "default" || type === "header-a") && (
          <>
            {type === "default" && (
              <div className="logo">
                <a href="#">
                  <img src="/images/logo.png" alt="로고" />
                </a>
              </div>
            )}

            {type === "header-a" && (
              <div className="logo">
                <span className="logo__title">{pageTitle}</span>
              </div>
            )}

            <div className="menu">
              <ul className="menu__list">
                <li>
                  <i
                    onClick={handleIconClick(icon1, icon1OnClick)}
                    className="ico"
                    style={{
                      background: `url(/icons/${icon1}.svg) no-repeat center center`,
                    }}
                  ></i>
                </li>
                {icon2 && (
                  <li>
                    <i
                      onClick={handleIconClick(icon2, icon2OnClick)}
                      className="ico"
                      style={{
                        background: `url(/icons/${icon2}.svg) no-repeat center center`,
                      }}
                    ></i>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
