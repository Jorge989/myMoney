import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
export default function TransactionForm({ uid }) {
  const { addDocument, response } = useFirestore("transactions");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ uid: uid, name, amount });
    setName("");
    setAmount("");
  };
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);
  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          <span>Amount:</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          ></input>
        </label>
        <button>Add transaction</button>
      </form>
    </>
  );
}
