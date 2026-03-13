"use client";

import styles from "./ListCheck.module.scss";

interface PropsState {
  listInfo: ListInfo;
  selectedItem: string;
  onSelectedChange: (category: string, selected: string) => void;
}

interface ListInfo {
  label: string;
  checkList: string[];
  category: string;
}

export default function ListCheckButton({
  listInfo,
  selectedItem,
  onSelectedChange,
}: PropsState) {
  const handleClick = (clickedItem: string) => {
    const nextValue = selectedItem === clickedItem ? "" : clickedItem;
    onSelectedChange(listInfo.category, nextValue);
  };

  return (
    <section className={styles.container}>
      <p>{listInfo.label}</p>
      <div role="radiogroup" aria-label={listInfo.label}>
        {listInfo.checkList.map((item) => {
          const isSelected = item === selectedItem;

          return (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.btn} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}
