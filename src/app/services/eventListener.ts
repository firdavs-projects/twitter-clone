let _eventHandlers: {
  event: string;
  node: Node;
  capture: boolean;
  handler: EventListenerOrEventListenerObject | ((e: Event) => void);
}[] = [];

export const addEventListener = (
  node: Node,
  event: string,
  handler: EventListenerOrEventListenerObject | ((e: Event) => void),
  capture = false
) => {
  _eventHandlers.push({ event, node, handler, capture });
  node.addEventListener(event, handler, capture);
};

export const removeAllEventListeners = () => {
  _eventHandlers.forEach((l) => l.node.removeEventListener(l.event, l.handler, l.capture));
  _eventHandlers = [];
};
