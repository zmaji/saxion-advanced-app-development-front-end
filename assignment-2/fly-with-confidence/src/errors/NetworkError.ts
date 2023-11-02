class NetworkError extends Error {
  constructor() {
    super('No network connection. Please check your internet connection and try again.');
    this.name = 'NetworkError';
  }
}

export default NetworkError;
