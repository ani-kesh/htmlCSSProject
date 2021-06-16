"use strict";

window.onload = function pageLoad() {
  let countNotification = getNotifications().length;
  if (countNotification > 0)
    document.getElementById("count-notification").innerText = countNotification;
  else document.getElementById("notification-container").style.display = "none";
};

let notifications = [];

function showHideNotification(that) {
  let showHideNot = that.getAttribute("data-not-visibility");
  const notificationNav = document.getElementById("notification-nav");
  if (notificationNav !== null) notificationNav.remove();

  if (showHideNot === "false") {
    createNotificationNav();
    that.setAttribute("data-not-visibility", true);
  } else {
    that.setAttribute("data-not-visibility", false);
  }
}

function createNotificationNav() {
  let rightSide = document.createElement("div");
  rightSide.className = "notification-nav";
  rightSide.id = "notification-nav";

  document.body.append(rightSide);
  for (let i = 0; i < notifications.length; i++) {
    createEachNotification(notifications[i], notifications);
  }
}
function createEachNotification(notificationItem, notifications) {
  let notification = document.createElement("div");
  notification.className = "notification-item";
  notification.id = notificationItem.id;

  let closeDiv = document.createElement("div");
  closeDiv.className = "close-container";

  let closeIcon = document.createElement("i");
  closeIcon.className = "fas fa-times";
  closeIcon.addEventListener("click", () => {
    close(notificationItem.id, notifications);
  });

  let title = document.createElement("h4");
  title.className = "notification-title";
  title.innerText = notificationItem.title + notificationItem.id;

  let description = document.createElement("div");
  description.className = "notification-description";
  description.innerText = notificationItem.description + notificationItem.id;
  description.title = "Open notification";
  description.addEventListener("click", () => {
    openNotification(notificationItem.id);
  });

  closeDiv.append(closeIcon);
  closeDiv.append(title);
  notification.append(closeDiv);
  notification.append(description);

  document.getElementById("notification-nav").append(notification);
}

function close(id, notifications) {
  let indexEl = -1;
  notifications.forEach((el, index) => {
    if (el.id === id) {
      indexEl = index;
      return;
    }
  });

  if (indexEl > -1) {
    notifications.splice(indexEl, 1);
    const notificationNav =
      document.getElementsByClassName("notification-item");
    if (notificationNav.length > 0) {
      notificationNav[indexEl].remove();
      if (notificationNav.length > 0)
        document.getElementById("count-notification").innerText =
          notificationNav.length;
      else
        document.getElementById("notification-container").style.display =
          "none";
    }
  }
}

function removeNotification() {}

function getNotifications() {
  notifications = [
    {
      id: 0,
      title: "Title for first element ",
      description: "Description",
    },
    { id: 1, title: "Title ", description: "Description " },
    { id: 2, title: "Title ", description: "Description " },
    { id: 3, title: "Title ", description: "Description " },
    { id: 4, title: "Title ", description: "Description " },
    { id: 5, title: "Title ", description: "Description " },
    { id: 6, title: "Title ", description: "Description " },
    { id: 7, title: "Title ", description: "Description " },
    { id: 8, title: "Title ", description: "Description " },
    { id: 9, title: "Title ", description: "Description " },
    { id: 10, title: "Title ", description: "Description " },
    { id: 11, title: "Title ", description: "Description " },
    { id: 12, title: "Title ", description: "Description " },
    { id: 13, title: "Title ", description: "Description " },
    { id: 14, title: "Title ", description: "Description " },
  ];
  return notifications;
}

function openNotification(id) {
  let origin = window.location.origin;
  let url = `${origin}/pages/notification.html?id=${id}`;
  close(id, notifications);
  window.open(url, "_blank");
}
