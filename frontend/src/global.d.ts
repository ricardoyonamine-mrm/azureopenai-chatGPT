// A simplified implementation of the dataLayer object
type TDataLayer = {
  push: (data: Record<string, unknown>) => void;
};

type TWindowWithDataLayer = typeof window & {
  dataLayer: TDataLayer;
};

// A type guard to determine whether or not window has a dataLayer
const windowHasDataLayer = (
  providedWindow: Window,
): providedWindow is TWindowWithDataLayer =>
  typeof providedWindow !== 'undefined' &&
  typeof (providedWindow as TWindowWithDataLayer)
    .dataLayer !== 'undefined';

// Call the provided callback if (and only if) the window has a dataLayer
const withDataLayer = (
  callback: (dataLayer: TDataLayer) => void,
): void => {
  if (windowHasDataLayer(window)) {
    callback(window.dataLayer);
  }
};

const pushToDataLayer = (
  data: Record<string, unknown>,
): void => withDataLayer(({ push }) => push(data));
