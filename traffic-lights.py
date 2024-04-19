import cv2
import numpy as np
from time import sleep

min_width = 80  # Minimum rectangle width
min_height = 80  # Minimum rectangle height

offset = 6  # Allowed error between pixels

line_position = 550  # Position of the counting line

fps = 60  # Video FPS

detection = []
cars = 0

def get_center(x, y, w, h):
    x1 = int(w / 2)
    y1 = int(h / 2)
    cx = x + x1
    cy = y + y1
    return cx, cy

cap = cv2.VideoCapture("videoproject.mp4")  # Replace "your_video_path.mp4" with your video file path
subtractor = cv2.bgsegm.createBackgroundSubtractorMOG()



while True:
    ret, frame1 = cap.read()
    time = float(1 / fps)
    sleep(time)
    gray = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (3, 3), 5)
    img_sub = subtractor.apply(blur)
    dilate = cv2.dilate(img_sub, np.ones((5, 5)))
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated = cv2.morphologyEx(dilate, cv2.MORPH_CLOSE, kernel)
    dilated = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel)
    contours, h = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    cv2.line(frame1, (25, line_position), (1200, line_position), (255, 127, 0), 3)
    for (i, c) in enumerate(contours):
        (x, y, w, h) = cv2.boundingRect(c)
        is_valid_contour = (w >= min_width) and (h >= min_height)
        if not is_valid_contour:
            continue

        cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)
        center = get_center(x, y, w, h)
        detection.append(center)
        cv2.circle(frame1, center, 4, (0, 0, 255), -1)

        for (x, y) in detection:
            if y < (line_position + offset) and y > (line_position - offset):
                cars += 1
                cv2.line(frame1, (25, line_position), (1200, line_position), (0, 127, 255), 3)
                detection.remove((x, y))
                print("Car is detected: " + str(cars))


    cv2.putText(frame1, "VEHICLE COUNT: " + str(cars), (450, 70), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 5)
    cv2.imshow("Original Video", frame1)
    cv2.imshow("Detection", dilated)

    if cv2.waitKey(1) == 27:
        break



cv2.destroyAllWindows()
cap.release()
