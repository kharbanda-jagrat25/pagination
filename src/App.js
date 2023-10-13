import { useEffect, useRef, useState } from 'react';
import './App.css';
import PostCard from './components/PostCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [dataToShow, setDataToShow] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      const processedData = new Set([...dataToShow, ...data.posts.slice(pageNum - 1, pageNum*20)]);
      setDataToShow([...processedData]);
    } else setIsFirstRender(false);
  }, [pageNum]);

  const observer = useRef(new IntersectionObserver(entries => {
    const first = entries[0];
    if (first.isIntersecting) setPageNum(no => no + 1);
  }));

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) currentObserver.observe(currentElement);
    return () => {
      if (currentElement) currentObserver.unobserve(currentElement);
    }
  }, [lastElement]);

  const fetchData = async() => {
    setLoading(true);
    const resData = await fetch("https://mocki.io/v1/072f4309-6b86-4ecc-b055-e16192d9f76a").then(res => res.json());
    setLoading(false);
    setData(resData);
    setDataToShow([...resData?.posts?.slice(0, 20)]);
  }

  return (
    <div className="App">
      <div>
        {dataToShow?.map((post, i) => {
          return (i === dataToShow.length - 1 && !loading && pageNum <= data.total) ? (
            <div
              key={i}
              ref={setLastElement}
            >
              <PostCard data={post} />
            </div>
          ) : (
            <PostCard key={i} data={post} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
