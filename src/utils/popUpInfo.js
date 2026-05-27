export function disappearNotification(notificationElement, duration = 2000) {

  setTimeout(() => {
    notificationElement.classList.add("fade-out");
    setTimeout(() => {
      notificationElement.classList.add("hidden");
      notificationElement.classList.remove("fade-out");
    }, 500); // Match this with CSS fade-out duration
  }, duration); 
}