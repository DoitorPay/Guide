import React, { useState } from "react";
import StyleGuide from "@/guide/styleGuide";
import ColorGuide from "@/guide/colorGuide";
import VariablesGuide from "@/guide/variablesGuide";

const guideList = [
  { id: 1, name: "Style Guide", component: <StyleGuide /> },
  { id: 2, name: "Color Guide", component: <ColorGuide /> },
  { id: 3, name: "SCSS Variables", component: <VariablesGuide /> },
];

export default function CssSidebar() {
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className="inner-wrap cmp-sidebar">
      <div className="cmp-sidebar__itemList">
        <ul>
          {guideList.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedGuide(item)}
              style={{ cursor: "pointer" }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="cmp-sidebar__components">
        {selectedGuide ? (
          <>
            <h3>{selectedGuide.name}</h3>
            {selectedGuide.component}
          </>
        ) : (
          <p>Style Guide : SCSS convention rule <br/>
          Color Guide : used color list <br/>
          SCSS Variables : used Variables list
          </p>
        )}
      </div>
    </div>
  );
}
