import styles from "./sell.module.css";
import CreatePostForm from "@/features/sell/components/CreatePostForm";
import MyPostsList from "@/features/sell/components/MyPostsList";

const Sell = () => {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <CreatePostForm />
        <MyPostsList />
      </div>
    </main>
  );
};

export default Sell;
