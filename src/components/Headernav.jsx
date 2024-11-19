import useData from "../store/dataState";
import Floorselect from "../components/Floorselect";
import MeterSelect from "../components/MeterSelect";

function Headernav() {
  const { updateView, view } = useData();

  const handleView = () => {
    view == 2 ? updateView(3) : updateView(2);
  };

  return (
    <header className="w-full min-h-fit flex flex-col gap-8font-semibold shadow-md z-40 fixed bg-white top-0 left-0">
      <div className="flex justify-between items-center border-b px-8 h-16 font-semibold">
        <svg
          onClick={() => updateView(0)}
          width="149px"
          height="41px"
          viewBox="0 0 149 41"
          version="1.1"
          className="cursor-pointer"
        >
          <g id="Group-39-Copy">
            <g id="Group">
              <path
                d="M14.2343 7.10452C14.2335 3.67313 11.7767 0.732546 8.39579 0.116235C5.01488 -0.500076 1.67585 1.38399 0.460614 4.5937C-0.754621 7.80342 0.501171 11.4217 3.445 13.1924C2.50403 13.747 1.70261 14.5092 1.10205 15.4206C0.671805 16.0859 0.863242 16.9735 1.52964 17.4031C2.19603 17.8326 3.08504 17.6415 3.51528 16.9762C4.61824 15.269 6.77901 14.5829 8.66704 15.3403C10.5551 16.0976 11.6397 18.0857 11.253 20.0802C10.8664 22.0747 9.11714 23.515 7.08242 23.5144C6.28986 23.5144 5.64736 24.1558 5.64736 24.9472C5.64736 25.7385 6.28986 26.3799 7.08242 26.3799C10.283 26.3854 13.0928 24.2553 13.9473 21.1758C14.8018 18.0963 13.4904 14.8262 10.7433 13.1866C12.8864 11.9071 14.1987 9.5976 14.1991 7.10452M7.08242 11.3444C4.73709 11.3444 2.83583 9.44615 2.83583 7.10452C2.83583 4.76289 4.73709 2.86462 7.08242 2.86462C9.42774 2.86462 11.329 4.76289 11.329 7.10452C11.3258 9.44481 9.42641 11.3412 7.08242 11.3444"
                transform="translate(5.5870805 5.3310165)"
                id="Shape"
                fill="#80C342"
                stroke="none"
              />
              <path
                d="M7.1169 0C4.23793 9.73574e-07 1.64256 1.73183 0.541374 4.38768C-0.559811 7.04353 0.0501374 10.1002 2.08671 12.1319C4.12329 14.1636 7.18527 14.77 9.84441 13.6684C12.5035 12.5668 14.236 9.97405 14.2336 7.09963C14.2304 3.17767 11.0451 -1.32838e-06 7.1169 0M7.1169 11.3395C4.77158 11.3395 2.87031 9.44126 2.87031 7.09963C2.87031 4.758 4.77158 2.85973 7.1169 2.85973C9.46223 2.85973 11.3635 4.758 11.3635 7.09963C11.3603 9.43992 9.46089 11.3363 7.1169 11.3395"
                transform="translate(114.10124 5.3359065)"
                id="Shape"
                fill="#80C342"
                stroke="none"
              />
              <path
                d="M7.13128 1.3722e-05C3.88005 -0.0063308 1.03788 2.18803 0.226082 5.33132C-0.585714 8.47461 0.839289 11.7676 3.6882 13.3317C6.53711 14.8958 10.0855 14.3334 12.3092 11.9653C12.8119 11.3825 12.764 10.5074 12.2007 9.98268C11.6375 9.458 10.7598 9.47094 10.2122 10.012C8.9144 11.4013 6.8494 11.759 5.15867 10.8874C3.46794 10.0159 2.56424 8.12788 2.94709 6.26696C3.32994 4.40604 4.90586 3.02653 6.80378 2.89096C8.7017 2.75539 10.4583 3.89684 11.1026 5.68439L6.29367 5.68439C5.50111 5.68439 4.85862 6.32588 4.85862 7.11719C4.85862 7.90849 5.50111 8.54998 6.29367 8.54998L12.7895 8.54998C13.582 8.54998 14.2245 7.90849 14.2245 7.11719C14.2213 3.19428 11.037 0.0149347 7.10785 0.01171"
                transform="translate(29.770134 5.3300447)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M7.11896 0.0233925C5.17215 0.0227763 3.31008 0.818468 1.96651 2.22511C0.62294 3.63176 -0.0848117 5.52653 0.00812257 7.46806C0.20814 11.1114 3.11882 14.0225 6.76752 14.2285L7.1131 14.2285C9.0873 14.2297 10.9733 13.4121 12.3203 11.9711C12.6944 11.6014 12.8357 11.057 12.6887 10.5524C12.5416 10.0479 12.1297 9.66418 11.6154 9.55265C11.101 9.44112 10.5668 9.61965 10.2234 10.0178C9.05878 11.2816 7.24567 11.7192 5.6315 11.1261C4.01734 10.5329 2.92095 9.0262 2.8548 7.31016C2.7581 5.21624 4.20846 3.36604 6.26748 2.95664C8.3265 2.54724 10.3761 3.70153 11.0903 5.67268L6.28136 5.67268C5.4888 5.67268 4.8463 6.31417 4.8463 7.10548C4.8463 7.89678 5.4888 8.53827 6.28136 8.53827L12.8123 8.53827C13.1939 8.53982 13.5604 8.38955 13.8308 8.12069C14.1012 7.85182 14.2532 7.48649 14.2532 7.10548C14.2468 3.1839 11.0643 0.00643938 7.13653 0"
                transform="translate(45.08188 5.306666)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M7.11868 0.00584813C5.17294 0.00530805 3.31182 0.800203 1.96844 2.20555C0.625051 3.6109 -0.0834372 5.50413 0.00784477 7.44467C0.202367 11.0914 3.11526 14.0073 6.76724 14.211L7.11283 14.211C9.08702 14.2122 10.973 13.3946 12.32 11.9536C12.8619 11.3754 12.8317 10.4682 12.2527 9.9272C11.6736 9.3862 10.7649 9.41631 10.2231 9.99445C8.92661 11.3813 6.8644 11.7379 5.1763 10.8671C3.48819 9.99632 2.58629 8.11069 2.96909 6.25248C3.3519 4.39426 4.92597 3.0171 6.82126 2.88217C8.71656 2.74724 10.4704 3.8875 11.1134 5.67268L5.79492 5.67268C5.00236 5.67268 4.35987 6.31417 4.35987 7.10548C4.35987 7.89678 5.00236 8.53827 5.79492 8.53827L12.7945 8.53827C13.1755 8.53983 13.5415 8.38938 13.8109 8.12034C14.0804 7.8513 14.2311 7.48595 14.2295 7.10548C14.2263 3.18485 11.0455 0.00644708 7.11868 0"
                transform="translate(87.85848 5.32421)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M1.43505 0.000620167C1.06528 -0.0103981 0.70629 0.125777 0.43713 0.379157C0.167969 0.632536 0.0107158 0.982341 0 1.35154L0 16.1765C0 16.9678 0.642496 17.6093 1.43505 17.6093C2.22761 17.6093 2.87011 16.9678 2.87011 16.1765L2.87011 1.35154C2.85939 0.982341 2.70214 0.632536 2.43298 0.379157C2.16382 0.125777 1.80482 -0.0103981 1.43505 0.000620167"
                transform="translate(103.68706 1.5456994)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M1.43505 0.000807018C1.06528 -0.0102112 0.70629 0.125964 0.437129 0.379343C0.167969 0.632723 0.0107158 0.982528 0 1.35172L0 16.1767C0.0484403 16.9341 0.67784 17.5237 1.43798 17.5237C2.19812 17.5237 2.82752 16.9341 2.87597 16.1767L2.87597 1.35172C2.86527 0.981482 2.70721 0.630766 2.43677 0.377218C2.16633 0.123669 1.80582 -0.0117973 1.43505 0.000807018"
                transform="translate(109.2867 1.5455124)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M6.0858 0.267874C4.94042 0.269237 3.81905 0.595788 2.85254 1.20942C2.73595 0.472057 2.07185 -0.0523804 1.32632 0.00417197C0.580794 0.0607244 0.00367517 0.679315 0 1.4258L0 11.9524C8.32381e-15 12.7437 0.642496 13.3852 1.43505 13.3852C2.22761 13.3852 2.87011 12.7437 2.87011 11.9524L2.87011 6.32069C2.87334 4.54979 4.31211 3.11591 6.0858 3.11591C6.8444 3.06755 7.43489 2.43914 7.43489 1.6802C7.43489 0.921253 6.8444 0.292845 6.0858 0.244481"
                transform="translate(22.217001 5.7113266)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M6.08632 0.307107C4.93922 0.309287 3.8162 0.635729 2.8472 1.24866C2.75196 0.493892 2.08044 -0.0535715 1.32071 0.00417697C0.560981 0.0619254 -0.0197916 0.704578 0.000516659 1.46504L0.000516659 12.132C0.000516659 12.9233 0.643012 13.5648 1.43557 13.5648C2.22813 13.5648 2.87062 12.9233 2.87062 12.132L2.87062 6.35992C2.87386 4.58903 4.31262 3.15514 6.08632 3.15514C6.94089 3.13361 7.7664 3.46552 8.36753 4.07235C8.96865 4.67917 9.29198 5.50699 9.26101 6.35992L9.26101 12.1086C9.26101 12.8999 9.9035 13.5414 10.6961 13.5414C11.4886 13.5414 12.1311 12.8999 12.1311 12.1086L12.1311 6.35992C12.1713 4.74358 11.5487 3.18094 10.4075 2.0338C9.26631 0.886666 7.70545 0.254515 6.08632 0.283714"
                transform="translate(61.056656 5.672094)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M19.0162 0.115293C18.6652 -0.0344861 18.2689 -0.038481 17.9149 0.104192C17.561 0.246865 17.2786 0.524449 17.1301 0.87555L14.014 8.2208L11.2376 1.20305C11.0185 0.657877 10.4905 0.299506 9.90212 0.296585L9.90212 0.296585C9.31226 0.29463 8.78179 0.654686 8.56664 1.20305L5.77853 8.2208L2.76199 0.922335C2.56633 0.449101 2.13267 0.116033 1.62436 0.0485968C1.11605 -0.0188399 0.610313 0.189599 0.297663 0.595397C-0.0149862 1.00119 -0.0870539 1.5427 0.108607 2.01593L4.4782 12.5894C4.70257 13.1244 5.22683 13.4726 5.80782 13.4724L5.80782 13.4724C6.39195 13.4705 6.91613 13.1139 7.13159 12.5718L9.8904 5.64177L12.6199 12.566C12.8368 13.1045 13.3565 13.4603 13.9378 13.4679C14.5192 13.4756 15.0482 13.1337 15.2792 12.601L19.7718 2.02763C20.0769 1.29928 19.737 0.461531 19.0103 0.150382"
                transform="translate(129.1107 5.717704)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M11.2731 0.108799C10.9212 -0.0362859 10.5261 -0.0358428 10.1745 0.11003C9.82302 0.255904 9.54395 0.535253 9.39875 0.8866L6.07762 8.91608L2.76236 0.8866C2.45989 0.155043 1.62071 -0.193191 0.888 0.108799C0.155288 0.410788 -0.193496 1.24864 0.108971 1.9802L4.47856 12.5536C4.49596 12.5861 4.51553 12.6173 4.53714 12.6472L2.28791 18.0859C2.1426 18.4372 2.14304 18.8318 2.28914 19.1828C2.43525 19.5337 2.71504 19.8124 3.06694 19.9573C3.23906 20.031 3.42442 20.0688 3.61167 20.0685C4.19457 20.0693 4.72003 19.718 4.94129 19.1795L12.0521 1.9802C12.1974 1.6289 12.197 1.23435 12.0509 0.883374C11.9048 0.532401 11.625 0.253769 11.2731 0.108799"
                transform="translate(74.888725 5.7183504)"
                id="Path"
                fill="#80C342"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M6.35452 0.0156091C7.13961 -0.0998607 7.87133 0.437629 7.99458 1.22032C8.50312 4.50439 7.67881 7.85534 5.70436 10.5305C4.75233 11.8308 3.5593 12.9366 2.18994 13.788C1.51384 14.203 0.628766 13.9922 0.213077 13.3172C-0.202612 12.6421 0.00849413 11.7585 0.684595 11.3434C1.74572 10.6899 2.67052 9.83806 3.40827 8.83459C4.92863 6.76997 5.56112 4.18504 5.16548 1.65308C5.10661 1.27687 5.20015 0.892739 5.42544 0.585505C5.65073 0.278272 5.98925 0.0732124 6.36624 0.0156091"
                transform="translate(140.8586 26.999308)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M1.43508 13.0905C0.642518 13.0905 2.27325e-05 12.449 2.27325e-05 11.6577C-0.00632165 8.33398 1.31555 5.14501 3.67259 2.79782C4.81739 1.65581 6.17165 0.744472 7.66145 0.113528C8.39255 -0.194921 9.23566 0.146767 9.5446 0.876709C9.85353 1.60665 9.5113 2.44843 8.78021 2.75688C5.19653 4.26707 2.86793 7.77406 2.87013 11.6577C2.87013 12.449 2.22764 13.0905 1.43508 13.0905"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.80143 1.15004C3.69576 1.08786 3.58386 1.0369 3.46756 0.997986C3.3229 0.956555 3.17287 0.936845 3.0224 0.939505C2.78953 0.92742 2.5629 1.01707 2.40152 1.18513C2.25273 1.34339 2.1709 1.55289 2.17308 1.76994C2.17308 1.98632 2.43081 2.26703 2.93454 2.60037C3.37337 2.83309 3.66114 3.27512 3.696 3.77C3.69168 4.34789 3.44563 4.89767 3.01734 5.28642C2.58905 5.67516 2.01751 5.86747 1.44091 5.81684C0.93776 5.85555 0.434827 5.7392 0 5.4835L0.480304 4.60628C0.58435 4.68045 0.701656 4.73405 0.825888 4.76418C0.977816 4.80967 1.13589 4.83137 1.29448 4.82851C1.54509 4.83815 1.79002 4.75245 1.97979 4.58874C2.1586 4.42825 2.25723 4.19707 2.24923 3.95714C2.24923 3.73881 2.01493 3.46395 1.54634 3.13255C1.12692 2.88856 0.861709 2.44725 0.84346 1.96293C0.852022 1.41816 1.08345 0.900619 1.48396 0.530568C1.88446 0.160517 2.41918 -0.0298155 2.96383 0.00380414C3.2127 -0.000910768 3.46104 0.028607 3.70185 0.0915261C3.89471 0.142974 4.07846 0.223852 4.24659 0.331299L3.80143 1.15004Z"
                transform="translate(27.506199 28.227524)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M4.10015 5.64344L2.77053 5.64344L3.26841 3.19893L1.83921 3.19893L1.34134 5.64344L0 5.64344L1.16562 0L2.50695 0L2.02079 2.32755L3.44999 2.32755L3.93615 0L5.26577 0L4.10015 5.64344L4.10015 5.64344Z"
                transform="translate(32.01051 28.359987)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M1.34134 5.64344L0 5.64344L1.16562 0L2.50695 0L1.34134 5.64344L1.34134 5.64344Z"
                transform="translate(37.709724 28.359987)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.87172 0.888915L2.31366 0.888915L2.02079 2.32755L3.37384 2.32755L3.19226 3.19893L1.83921 3.19893L1.33548 5.64344L0 5.64344L1.16562 0L4.05915 0L3.87172 0.888915L3.87172 0.888915Z"
                transform="translate(40.638405 28.359987)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.28012 0.894764L2.30194 0.894764L1.32962 5.64929L0 5.64929L0.972322 0.894764L0 0.894764L0.181578 0L3.4617 0L3.28012 0.894764L3.28012 0.894764Z"
                transform="translate(45.58202 28.359987)"
                id="Path"
                fill="#FBCA32"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.28598 0.894764L2.3078 0.900612L1.35891 5.65514L0.0292868 5.66099L0.97818 0.90646L0 0.912308L0.181578 0.0175444L3.4617 0L3.28598 0.894764L3.28598 0.894764Z"
                transform="translate(52.194984 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.80425 4.8005C3.57735 5.11156 3.28302 5.36744 2.94322 5.54906C2.58102 5.73407 2.17851 5.8265 1.77175 5.81807C1.27288 5.85104 0.786654 5.65254 0.45384 5.28005C0.13622 4.86518 -0.0236061 4.35123 0.00282287 3.82971C0.00862924 3.32495 0.0915881 2.82404 0.248832 2.34428C0.383001 1.88009 0.59706 1.44276 0.881427 1.05185C1.11669 0.731997 1.41839 0.466676 1.76589 0.274047C2.11145 0.0895543 2.49873 -0.00308551 2.8905 0.00503332C3.388 -0.0344709 3.87544 0.160199 4.20841 0.531365C4.51497 0.939842 4.66835 1.44272 4.64185 1.95246C4.63362 2.46612 4.55277 2.97604 4.4017 3.46713C4.27343 3.94405 4.06336 4.39518 3.78082 4.8005M2.78507 0.882253C2.59108 0.882154 2.40525 0.960164 2.26962 1.09863C2.09606 1.28623 1.95546 1.50174 1.85375 1.73608C1.69343 2.09563 1.5679 2.46967 1.47888 2.85307C1.37974 3.23543 1.32471 3.62786 1.31487 4.0227C1.30521 4.22628 1.35182 4.4286 1.44959 4.60751C1.55254 4.75501 1.72725 4.83552 1.90647 4.81804C2.10293 4.8162 2.29056 4.73622 2.42777 4.59581C2.60121 4.40488 2.73996 4.18521 2.83779 3.94667C2.98771 3.58796 3.10342 3.21593 3.18337 2.83553C3.28434 2.45337 3.34133 2.06096 3.35323 1.6659C3.36003 1.46258 3.3136 1.26101 3.21852 1.08109C3.12374 0.936142 2.95808 0.853442 2.78507 0.864708"
                transform="translate(55.642147 28.284777)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M4.22902 2.81887C4.00521 3.08029 3.71921 3.28139 3.39727 3.40368C3.00774 3.54807 2.59435 3.61752 2.17894 3.60837L1.73964 3.60837L1.30619 5.73124L0 5.73124L1.11876 0.333414C1.37663 0.223008 1.64567 0.140659 1.92122 0.0877929C2.2423 0.0321868 2.56766 0.00479067 2.89354 0.00591911C3.39084 -0.0309748 3.88558 0.105431 4.29345 0.391896C4.59849 0.640249 4.76968 1.01672 4.75618 1.40947C4.7619 1.93361 4.57425 2.44152 4.22902 2.83641M2.77053 0.760328C2.61578 0.757332 2.46154 0.779049 2.31366 0.824657L1.90364 2.83641C1.95424 2.84216 2.00533 2.84216 2.05593 2.83641L2.2258 2.83641C2.71001 2.83641 3.02045 2.71945 3.15712 2.48553C3.27093 2.30253 3.36144 2.10608 3.42656 1.90071C3.4717 1.73881 3.49533 1.57168 3.49685 1.40362C3.50792 1.22736 3.44658 1.0542 3.32698 0.924075C3.16993 0.804064 2.97329 0.747671 2.77639 0.766176"
                transform="translate(62.697235 28.295586)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M4.38131 2.57362C4.2164 2.7625 4.01778 2.91916 3.79557 3.03562C3.58773 3.15292 3.35889 3.22841 3.12197 3.25785L4.12358 5.73161L2.7061 5.73161L1.85093 3.21691L1.30619 5.73161L0 5.73161L1.11876 0.333786C1.3776 0.227435 1.64641 0.147114 1.92122 0.0940123C2.23401 0.0347593 2.55174 0.00538601 2.87011 0.00629041C3.38232 -0.0312831 3.8927 0.100221 4.32273 0.380571C4.64903 0.611788 4.83456 0.993291 4.81475 1.3923C4.81862 1.82202 4.66438 2.23821 4.38131 2.56192M2.75296 0.754851C2.60744 0.753401 2.46277 0.777145 2.32537 0.825028L1.90364 2.86602C2.00107 2.89168 2.10164 2.90349 2.20237 2.90111C2.52693 2.93038 2.84744 2.81225 3.07512 2.57947C3.22735 2.40886 3.34475 2.2102 3.4207 1.99465C3.48094 1.80562 3.5106 1.6082 3.50856 1.40984C3.50856 0.97708 3.25669 0.760699 2.75296 0.760699"
                transform="translate(67.535416 28.271822)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M3.80438 4.79465C3.57609 5.10597 3.28217 5.3635 2.94335 5.54906C2.58071 5.73227 2.17817 5.8227 1.77188 5.81222C1.27257 5.8479 0.785194 5.64893 0.45397 5.2742C0.135835 4.86185 -0.0241335 4.34951 0.00295268 3.82971C0.00829888 3.32491 0.0912693 2.82393 0.248962 2.34428C0.381767 1.87957 0.595938 1.442 0.881557 1.05185C1.11513 0.730457 1.41721 0.464807 1.76602 0.274047C2.11158 0.0895543 2.49886 -0.00308551 2.89063 0.00503331C3.38813 -0.0344709 3.87557 0.160199 4.20854 0.531365C4.516 0.939383 4.66949 1.4426 4.64198 1.95246C4.63414 2.46424 4.55328 2.97229 4.40183 3.46128C4.27356 3.9382 4.06349 4.38933 3.78095 4.79465M2.7852 0.882253C2.59067 0.879396 2.40379 0.957845 2.26975 1.09863C2.0948 1.28515 1.95404 1.50092 1.85388 1.73608C1.69267 2.09529 1.56711 2.46941 1.47901 2.85307C1.37951 3.23536 1.32448 3.62783 1.315 4.0227C1.30534 4.22628 1.35195 4.4286 1.44972 4.60751C1.55267 4.75501 1.72738 4.83552 1.9066 4.81804C2.10435 4.81667 2.29285 4.7342 2.4279 4.58997C2.60265 4.40224 2.7416 4.18423 2.83792 3.94667C2.98774 3.58591 3.10344 3.21195 3.1835 2.82968C3.28487 2.4476 3.34187 2.05514 3.35336 1.66005C3.36016 1.45674 3.31372 1.25516 3.21864 1.07524C3.12563 0.92833 2.95872 0.845005 2.7852 0.85886"
                transform="translate(72.90366 28.290625)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M3.86586 0.894764L2.31366 0.894764L2.02079 2.3334L3.37384 2.3334L3.19226 3.20477L1.83921 3.20477L1.33548 5.64929L0 5.64929L1.16562 0L4.05915 0L3.86586 0.894764L3.86586 0.894764Z"
                transform="translate(78.043526 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M1.34134 5.64344L0 5.64344L1.17147 0L2.50695 0L1.34134 5.64344L1.34134 5.64344Z"
                transform="translate(82.208115 28.365835)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.28012 0.894764L2.30194 0.894764L1.33548 5.64929L0 5.64929L0.972322 0.894764L0 0.894764L0.181578 0L3.4617 0L3.28012 0.894764L3.28012 0.894764Z"
                transform="translate(85.6581 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.63156 5.64929L3.53199 4.43873L1.83921 4.43873L1.21833 5.64929L0 5.64929L3.01068 0L4.31688 0L4.9729 5.64929L3.63156 5.64929ZM3.39141 1.83046L3.39141 1.24565C3.39533 1.20676 3.39533 1.16758 3.39141 1.12869L3.30941 1.37431C3.25404 1.52243 3.18949 1.66696 3.11612 1.80707L2.20237 3.65508L3.51442 3.65508L3.39141 1.83046Z"
                transform="translate(88.352486 28.359987)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M3.47342 2.7532C3.72394 2.83257 3.94715 2.98047 4.11773 3.18012C4.29272 3.38308 4.38658 3.64337 4.38131 3.91113C4.37788 4.14344 4.32601 4.37248 4.22902 4.58367C4.12872 4.81666 3.98568 5.02889 3.80729 5.20942C3.57266 5.41977 3.29175 5.57203 2.98726 5.65388C2.58711 5.76653 2.17293 5.82166 1.75721 5.81762C1.15368 5.85014 0.551133 5.73785 0 5.49013L1.0719 0.337927C1.63961 0.0966359 2.25348 -0.0171616 2.87011 0.00458349C3.36478 -0.0256999 3.85701 0.094615 4.28173 0.349623C4.59499 0.538507 4.78448 0.879043 4.77961 1.24439C4.78084 1.59995 4.64686 1.94273 4.40474 2.20348C4.16458 2.47973 3.84243 2.6723 3.48513 2.7532M2.07936 3.12748L1.75721 3.12748L1.3882 4.9404L1.60492 4.99889C1.69461 5.00544 1.78466 5.00544 1.87436 4.99889C2.18628 5.04002 2.50022 4.93911 2.72953 4.72402C2.85941 4.5707 2.95881 4.39405 3.0224 4.20354C3.07131 4.06038 3.09702 3.91034 3.09855 3.75908C3.10676 3.56372 3.01664 3.37718 2.85839 3.26199C2.62 3.1397 2.35256 3.08509 2.08522 3.10409M2.75882 0.729751C2.66331 0.721938 2.56732 0.721938 2.47181 0.729751C2.39242 0.74367 2.31412 0.763213 2.23751 0.788233L1.89779 2.44325L2.20823 2.44325C2.52587 2.48178 2.84629 2.39814 3.1044 2.20933C3.24441 2.07738 3.35256 1.91541 3.4207 1.73563C3.47251 1.58496 3.50018 1.42706 3.5027 1.26778C3.5027 0.899347 3.25669 0.712207 2.75882 0.712207"
                transform="translate(94.20985 28.27353)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M2.77053 5.64344L0 5.64344L1.16562 0L2.49524 0L1.51706 4.74868L2.95797 4.74868L2.77053 5.64344L2.77053 5.64344Z"
                transform="translate(99.376045 28.365835)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.87757 0.894764L2.31366 0.894764L2.02079 2.3334L3.38556 2.3334L3.20398 3.20477L1.83921 3.20477L1.51706 4.75453L3.08097 4.75453L2.89354 5.64929L0 5.64929L1.16562 0L4.05915 0L3.87757 0.894764L3.87757 0.894764Z"
                transform="translate(103.101326 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.87757 0.894764L2.31366 0.894764L2.02079 2.3334L3.38556 2.3334L3.20398 3.19893L1.83921 3.19893L1.51706 4.75453L3.08097 4.75453L2.89354 5.64344L0 5.64344L1.16562 0L4.05915 0L3.87757 0.894764L3.87757 0.894764Z"
                transform="translate(109.77286 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M4.2993 5.64344L3.30355 5.64344L2.07351 2.47961C2.02079 2.32755 1.97979 2.21644 1.95636 2.12872C1.92834 2.05021 1.90487 1.97015 1.88607 1.88895C1.88607 1.96497 1.85093 2.05269 1.83335 2.16381C1.81578 2.27492 1.79821 2.38019 1.76892 2.503L1.11876 5.64344L0 5.64344L1.17147 0L2.30194 0L3.47342 2.88898C3.53785 3.05857 3.58471 3.18138 3.60814 3.26326C3.63175 3.31975 3.64942 3.37855 3.66085 3.4387C3.66085 3.33343 3.696 3.25156 3.70771 3.18723C3.72287 3.08078 3.74439 2.97532 3.77214 2.87143L4.35788 1.66214e-14L5.47078 1.66214e-14L4.2993 5.64344Z"
                transform="translate(113.92573 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M3.88343 0.894764L2.31952 0.894764L2.02079 2.3334L3.38556 2.3334L3.20398 3.19893L1.84507 3.19893L1.52291 4.75453L3.08097 4.75453L2.89354 5.64344L0 5.64344L1.17147 0L4.06501 0L3.88343 0.894764L3.88343 0.894764Z"
                transform="translate(119.52537 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M4.38131 2.57312C4.21548 2.76104 4.01706 2.91755 3.79557 3.03512C3.58737 3.1516 3.35869 3.22704 3.12197 3.25735L4.12358 5.73111L2.70024 5.73111L1.84507 3.21641L1.30619 5.73111L0 5.73111L1.1129 0.333286C1.37203 0.227753 1.64076 0.147456 1.91536 0.0935128C2.22815 0.0342598 2.54588 0.00488649 2.86425 0.00579089C3.37815 -0.0300595 3.88985 0.101254 4.32273 0.380071C4.64903 0.611288 4.83456 0.992792 4.81475 1.3918C4.817 1.82228 4.66065 2.23856 4.37545 2.56142M2.75296 0.754351C2.6074 0.75242 2.46265 0.776177 2.32537 0.824529L1.90364 2.86553C2.001 2.89158 2.10162 2.9034 2.20237 2.90061C2.52529 2.93064 2.84434 2.81226 3.06926 2.57897C3.35839 2.25848 3.51533 1.84062 3.50856 1.40934C3.50856 0.97658 3.25669 0.760199 2.75296 0.760199"
                transform="translate(123.7661 28.266474)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
              <path
                d="M4.22663 1.11721C4.12125 1.06035 4.00906 1.01712 3.89276 0.98855C3.73096 0.955004 3.56597 0.939315 3.40074 0.941765C3.09845 0.936314 2.79986 1.00883 2.53385 1.1523C2.27104 1.28689 2.04871 1.4887 1.88954 1.73711C1.70477 2.02992 1.56646 2.34949 1.47952 2.68451C1.38271 3.02121 1.33149 3.36935 1.32723 3.71963C1.30715 4.02791 1.38951 4.3342 1.56153 4.591C1.70523 4.78951 1.93712 4.90527 2.18241 4.90095C2.27301 4.90086 2.36334 4.89106 2.45185 4.87171C2.516 4.86079 2.57883 4.84315 2.63928 4.81907L2.97315 3.21084L2.28784 3.21084L2.45185 2.40965L4.3672 2.40965L3.73461 5.47406C3.50738 5.59102 3.26487 5.67566 3.01415 5.72553C2.71284 5.78152 2.40689 5.80893 2.1004 5.80741C1.52783 5.84802 0.964529 5.6464 0.548203 5.25184C0.167209 4.8306 -0.028971 4.27458 0.00346787 3.70793C0.00740661 3.21729 0.0945469 2.73087 0.261192 2.26929C0.409089 1.81704 0.643855 1.39791 0.952361 1.03534C1.23663 0.706217 1.5908 0.444502 1.98911 0.26923C2.39591 0.0867261 2.83765 -0.00507514 3.28359 0.000216422C3.5633 -0.00267497 3.84241 0.0267615 4.11534 0.0879383C4.33781 0.133144 4.55146 0.214123 4.74793 0.327712L4.22663 1.11721Z"
                transform="translate(129.08698 28.254503)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M2.14379 3.27495L1.65178 5.64344L0.31044 5.64344L0.814173 3.27495L0 0L1.34719 0L1.70449 2.13457L3.0224 0L4.33445 0L2.14379 3.27495L2.14379 3.27495Z"
                transform="translate(134.68422 28.35414)"
                id="Path"
                fill="#313131"
                fillRule="evenodd"
                stroke="none"
              />
              <path
                d="M0.609356 5.73117C0.447332 5.7416 0.28824 5.68441 0.170054 5.57327C0.0574817 5.46005 -0.00387961 5.30583 0.000190295 5.14635C0.00541841 4.92389 0.100477 4.71298 0.263772 4.56154C0.426676 4.38954 0.65341 4.29222 0.890509 4.29253C1.05339 4.28365 1.2126 4.343 1.32981 4.45627C1.44306 4.56709 1.50646 4.71902 1.50553 4.87734C1.49558 5.09991 1.39889 5.30978 1.23609 5.46215C1.07179 5.63142 0.845445 5.72646 0.609356 5.72532M1.53482 3.67847L0.539068 3.67847L1.02523 0L2.58914 0L1.53482 3.67847Z"
                transform="translate(139.87366 28.34829)"
                id="Shape"
                fill="#313131"
                stroke="none"
              />
            </g>
          </g>
        </svg>
        <div className="flex items-center gap-16 h-full">
          <div className="flex gap-10 h-full">
            <button
              onClick={() => updateView(0)}
              className={`flex items-center gap-4 ${
                view != 1 && "active"
              } h-full hbutton`}
            >
              <svg width="25" height="25" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="m19 12.232l.955-.955C21.318 9.913 22 9.23 22 8.384s-.682-1.529-2.045-2.892l-1.447-1.447C17.145 2.682 16.463 2 15.616 2c-.848 0-1.53.682-2.893 2.045l-8.678 8.678C2.682 14.087 2 14.768 2 15.616s.682 1.529 2.045 2.892l1.447 1.447C6.855 21.318 7.537 22 8.384 22s1.53-.682 2.893-2.045L16.232 15M8.464 8.464L9.88 9.88m2.827-5.658l1.414 1.414m-9.899 7.071l1.414 1.414m.707-3.535l2.122 2.121m2.121-6.364l2.121 2.121"
                />
              </svg>
              Medición
            </button>
            <button
              onClick={() => updateView(1)}
              className={`flex items-center gap-4 ${
                view == 1 && "active"
              } h-full hbutton`}
            >
              <svg width="25" height="25" viewBox="0 0 16 16">
                <path
                  fill="currentColor"
                  d="M6 9.5A2 2 0 0 1 7.937 11H13.5a.5.5 0 0 1 .09.992L13.5 12l-5.563.001a2 2 0 0 1-3.874 0L2.5 12a.5.5 0 0 1-.09-.992L2.5 11h1.563A2 2 0 0 1 6 9.5m0 1a1 1 0 1 0 0 2a1 1 0 0 0 0-2m4-8A2 2 0 0 1 11.937 4H13.5a.5.5 0 0 1 .09.992L13.5 5l-1.563.001a2 2 0 0 1-3.874 0L2.5 5a.5.5 0 0 1-.09-.992L2.5 4h5.563A2 2 0 0 1 10 2.5m0 1a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                />
              </svg>
              Configuración
            </button>
          </div>
          <button className="p-2 flex items-center justify-center rounded bg-gray-100 logOut">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <g fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11 20a1 1 0 0 0-1-1H5V5h5a1 1 0 1 0 0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5a1 1 0 0 0 1-1"
                  clipRule="evenodd"
                />
                <path d="M21.714 12.7a1 1 0 0 0 .286-.697v-.006a1 1 0 0 0-.293-.704l-4-4a1 1 0 1 0-1.414 1.414L18.586 11H9a1 1 0 1 0 0 2h9.586l-2.293 2.293a1 1 0 0 0 1.414 1.414l4-4z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-between px-8 py-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateView(0)}
            className="w-10 h-10 aspect-auto bg-gray-600 text-white flex items-center justify-center rounded-full hover:scale-105 transition-all active:scale-95"
          >
            <svg width="25" height="25" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
          </button>
          <Floorselect></Floorselect>
          <MeterSelect></MeterSelect>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleView()}
            className="border-transparent border items-center px-4 py-2 rounded-full bg-yellow-300 hover:border-yellow-300 hover:bg-transparent transition-all"
          >
            Vista de {view == 2 && "Gráficas"}
            {view == 3 && "Datos"}
          </button>
          <button className="border-transparent border items-center px-4 py-2 rounded-full bg-yellow-300 hover:border-yellow-300 hover:bg-transparent transition-all">
            Descargar Datos
          </button>
        </div>
      </div>
    </header>
  );
}

export default Headernav;
