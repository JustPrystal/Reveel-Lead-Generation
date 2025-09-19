import loaderPng from '../assets/images/loader.png'
type GlobalLoaderProps = {
  loading: boolean;
};

export default function GlobalLoader({ loading }: GlobalLoaderProps) {
  return (
    <>
      {loading && (
        <div className="loading">
          <div className="spinner" >
              <img src={loaderPng} alt="global loader" />
          </div>
        </div>
      )}
    </>
  );
}
