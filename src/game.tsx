const PID_MODE = process.env.PID_MODE;
import { iclamp, make, random } from "jsx13k";
import { angle, lineAngle } from "jsx13k/dom-geometry";
import { steerElement } from "jsx13k/steering-behaviour";
import initPID from "jsx13k/pid-controller";
import { as, Fragment, jsx, state } from "jsx13k/jsx-runtime";
import { trail } from "jsx13k/devtools";
const { abs, sign } = Math;

const vehicle = as<HTMLButtonElement>();
const speed = state(0), steer = state(0), maxTurn = 20;

document.body.append(
  <>
    <button
      let={vehicle}
      name={speed}
      onclick={() => velocity(speed.val++)}
      onmouseleave={() => handling(steer(random(-.5, .5)))}
    >
      {speed} {steer}
      {/* TODO: steer(Math.round) */}
    </button>
  </>,
);

const move = make(steerElement(vehicle())),
  constrainSteer = iclamp(maxTurn),
  [velocity, , handling] = move;

const [compute, seterror] = PID_MODE ? initPID(1, 20) : [/*😑*/];
/**Good PID value
 * monotone: Kp=1
 * smooth: Kp=1,Kd=10
 * soft-pudding: Kp=1,Kd=20
 * jelly: Kp=1.5,Kd=25
 * unstable: Kp=.2,Kd=30
 * pudding shake on shudden move: Kp=1,Kd=20
 * shake on sudden move: Kp=2,Kd=20
 * spring hard: Kp=3,Kd=30
 * super springy: Kp=1,Kd=10,Ki=4e-2
 * spring-like: Kp=1,Kd=5,Ki=3e-2
 * spring on sudden move: Kp=1,Ki=5e-2
 * spring hard on sudden move: Kp=1.1,Ki=5e-2
 */

let steerAngle = 0, lastAngle = PID_MODE ? undefined : 0;

onmousemove = (mouse) => {
  steerAngle = lineAngle(vehicle(), mouse);
  if (PID_MODE) {
    seterror((measured) => {
      const error = steerAngle - measured;
      return abs(error) > 180 ? (360 - abs(error)) * -sign(error) : error;
    });
  }
};

setInterval(() => {
  const rotation = PID_MODE
    ? compute(angle(vehicle()))
    : steerAngle - lastAngle;

  // move(speed, rotation, -.7);
  move(null, constrainSteer(rotation));
  // TODO: trigger onmousemove if abs(angle) > 180-15 and distance(vehicle,mouse) < 5
  if (!PID_MODE) lastAngle = steerAngle;
}, 33);
