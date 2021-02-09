<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
  <Header id="OpenSCD_DataTypeTemplates"/>
  <DataTypeTemplate>
    <EnumType id="BehaviourModeKind">
      <EnumVal ord="1">on</EnumVal>
      <EnumVal ord="2">blocked</EnumVal>
      <EnumVal ord="3">test</EnumVal>
      <EnumVal ord="4">test/blocked</EnumVal>
      <EnumVal ord="5">off</EnumVal>
    </EnumType>
    <EnumType id="CtlModelKind">
      <EnumVal ord="0">status-only</EnumVal>
      <EnumVal ord="1">direct-with-normal-security</EnumVal>
      <EnumVal ord="2">sbo-with-normal-security</EnumVal>
      <EnumVal ord="3">direct-with-enhanced-security</EnumVal>
      <EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
    </EnumType>
    <EnumType id="OriginatorCategoryKind">
      <EnumVal ord="0">not-supported</EnumVal>
      <EnumVal ord="1">bay-control</EnumVal>
      <EnumVal ord="2">station-control</EnumVal>
      <EnumVal ord="3">remote-control</EnumVal>
      <EnumVal ord="4">automatic-bay</EnumVal>
      <EnumVal ord="5">automatic-station</EnumVal>
      <EnumVal ord="6">automatic-remote</EnumVal>
      <EnumVal ord="7">maintenance</EnumVal>
      <EnumVal ord="8">process</EnumVal>
    </EnumType>
    <EnumType id="MultiplierKind">
      <EnumVal ord="-24">y</EnumVal>
      <EnumVal ord="-21">z</EnumVal>
      <EnumVal ord="-18">a</EnumVal>
      <EnumVal ord="-15">f</EnumVal>
      <EnumVal ord="-12">p</EnumVal>
      <EnumVal ord="-9">n</EnumVal>
      <EnumVal ord="-6">µ</EnumVal>
      <EnumVal ord="-3">m</EnumVal>
      <EnumVal ord="-2">c</EnumVal>
      <EnumVal ord="-1">d</EnumVal>
      <EnumVal ord="0"></EnumVal>
      <EnumVal ord="1">da</EnumVal>
      <EnumVal ord="2">h</EnumVal>
      <EnumVal ord="3">k</EnumVal>
      <EnumVal ord="6">M</EnumVal>
      <EnumVal ord="9">G</EnumVal>
      <EnumVal ord="12">T</EnumVal>
      <EnumVal ord="15">P</EnumVal>
      <EnumVal ord="18">E</EnumVal>
      <EnumVal ord="21">Z</EnumVal>
      <EnumVal ord="24">Y</EnumVal>
    </EnumType>
    <EnumType id="AngleReferenceKind">
      <EnumVal ord="0">V</EnumVal>
      <EnumVal ord="1">A</EnumVal>
      <EnumVal ord="2">other</EnumVal>
      <EnumVal ord="3">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="CurveCharKind">
      <EnumVal ord="0">None</EnumVal>
      <EnumVal ord="1">ANSI Extremely Inverse</EnumVal>
      <EnumVal ord="2">ANSI Very Inverse</EnumVal>
      <EnumVal ord="3">ANSI Normal Inverse</EnumVal>
      <EnumVal ord="4">ANSI Moderate Inverse</EnumVal>
      <EnumVal ord="5">ANSI Definite Time </EnumVal>
      <EnumVal ord="6">Long-Time Extremely Inverse</EnumVal>
      <EnumVal ord="7">Long-Time Very Inverse</EnumVal>
      <EnumVal ord="8">Long-Time Inverse</EnumVal>
      <EnumVal ord="9">IEC Normal Inverse</EnumVal>
      <EnumVal ord="10">IEC Very Inverse</EnumVal>
      <EnumVal ord="11">IEC Inverse</EnumVal>
      <EnumVal ord="12">IEC Extremely Inverse</EnumVal>
      <EnumVal ord="13">IEC Short-Time Inverse</EnumVal>
      <EnumVal ord="14">IEC Long-Time Inverse</EnumVal>
      <EnumVal ord="15">IEC Definite Tim</EnumVal>
      <EnumVal ord="16">Reserved</EnumVal>
    </EnumType>
    <EnumType id="FaultDirectionKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">forward</EnumVal>
      <EnumVal ord="2">backward</EnumVal>
      <EnumVal ord="3">both</EnumVal>
    </EnumType>
    <EnumType id="HvReferenceKind">
      <EnumVal ord="0">fundamental</EnumVal>
      <EnumVal ord="1">rms</EnumVal>
      <EnumVal ord="2">absolute</EnumVal>
    </EnumType>
    <EnumType id="MonthKind">
      <EnumVal ord="0">reserved</EnumVal>
      <EnumVal ord="1">January</EnumVal>
      <EnumVal ord="2">February</EnumVal>
      <EnumVal ord="3">March</EnumVal>
      <EnumVal ord="4">April</EnumVal>
      <EnumVal ord="5">May</EnumVal>
      <EnumVal ord="6">June</EnumVal>
      <EnumVal ord="7">July</EnumVal>
      <EnumVal ord="8">August</EnumVal>
      <EnumVal ord="9">September</EnumVal>
      <EnumVal ord="10">October</EnumVal>
      <EnumVal ord="11">November</EnumVal>
      <EnumVal ord="12">December</EnumVal>
    </EnumType>
    <EnumType id="OccurrenceKind">
      <EnumVal ord="0">Time</EnumVal>
      <EnumVal ord="1">WeekDay</EnumVal>
      <EnumVal ord="2">WeekOfYear</EnumVal>
      <EnumVal ord="3">DayOfMonth</EnumVal>
      <EnumVal ord="4">DayOfYear</EnumVal>
    </EnumType>
    <EnumType id="OutputSignalKind">
      <EnumVal ord="0">pulse</EnumVal>
      <EnumVal ord="1">persistent</EnumVal>
      <EnumVal ord="2">persistent-feedback</EnumVal>
    </EnumType>
    <EnumType id="PeriodKind">
      <EnumVal ord="0">Hour</EnumVal>
      <EnumVal ord="1">Day</EnumVal>
      <EnumVal ord="2">Week</EnumVal>
      <EnumVal ord="3">Month</EnumVal>
      <EnumVal ord="4">Year</EnumVal>
    </EnumType>
    <EnumType id="PhaseAngleReferenceKind">
      <EnumVal ord="0">Va</EnumVal>
      <EnumVal ord="1">Vb</EnumVal>
      <EnumVal ord="2">Vc</EnumVal>
      <EnumVal ord="3">Aa</EnumVal>
      <EnumVal ord="4">Ab</EnumVal>
      <EnumVal ord="5">Ac</EnumVal>
      <EnumVal ord="6">Vab</EnumVal>
      <EnumVal ord="7">Vbc</EnumVal>
      <EnumVal ord="8">Vca</EnumVal>
      <EnumVal ord="9">Vother</EnumVal>
      <EnumVal ord="10">Aother</EnumVal>
      <EnumVal ord="11">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="PhaseFaultDirectionKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">forward</EnumVal>
      <EnumVal ord="2">backward</EnumVal>
    </EnumType>
    <EnumType id="PhaseReferenceKind">
      <EnumVal ord="0">A</EnumVal>
      <EnumVal ord="1">B</EnumVal>
      <EnumVal ord="2">C</EnumVal>
      <EnumVal ord="3">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="RangeKind">
      <EnumVal ord="0">normal</EnumVal>
      <EnumVal ord="1">high</EnumVal>
      <EnumVal ord="2">low</EnumVal>
      <EnumVal ord="3">high-high</EnumVal>
      <EnumVal ord="4">low-low</EnumVal>
    </EnumType>
    <EnumType id="SIUnitKind">
      <EnumVal ord="1"></EnumVal>
      <EnumVal ord="2">m</EnumVal>
      <EnumVal ord="3">kg</EnumVal>
      <EnumVal ord="4">s</EnumVal>
      <EnumVal ord="5">A</EnumVal>
      <EnumVal ord="6">K</EnumVal>
      <EnumVal ord="7">mol</EnumVal>
      <EnumVal ord="8">cd</EnumVal>
      <EnumVal ord="9">deg</EnumVal>
      <EnumVal ord="10">rad</EnumVal>
      <EnumVal ord="11">sr</EnumVal>
      <EnumVal ord="21">Gy</EnumVal>
      <EnumVal ord="22">Bq</EnumVal>
      <EnumVal ord="23">°C</EnumVal>
      <EnumVal ord="24">Sv</EnumVal>
      <EnumVal ord="25">F</EnumVal>
      <EnumVal ord="26">C</EnumVal>
      <EnumVal ord="27">S</EnumVal>
      <EnumVal ord="28">H</EnumVal>
      <EnumVal ord="29">V</EnumVal>
      <EnumVal ord="30">ohm</EnumVal>
      <EnumVal ord="31">J</EnumVal>
      <EnumVal ord="32">N</EnumVal>
      <EnumVal ord="33">Hz</EnumVal>
      <EnumVal ord="34">lx</EnumVal>
      <EnumVal ord="35">Lm</EnumVal>
      <EnumVal ord="36">Wb</EnumVal>
      <EnumVal ord="37">T</EnumVal>
      <EnumVal ord="38">W</EnumVal>
      <EnumVal ord="39">Pa</EnumVal>
      <EnumVal ord="41">m²</EnumVal>
      <EnumVal ord="42">m³</EnumVal>
      <EnumVal ord="43">m/s</EnumVal>
      <EnumVal ord="44">m/s²</EnumVal>
      <EnumVal ord="45">m³/s</EnumVal>
      <EnumVal ord="46">m/m³</EnumVal>
      <EnumVal ord="47">M</EnumVal>
      <EnumVal ord="48">kg/m³</EnumVal>
      <EnumVal ord="49">m²/s</EnumVal>
      <EnumVal ord="50">W/m K</EnumVal>
      <EnumVal ord="51">J/K</EnumVal>
      <EnumVal ord="52">ppm</EnumVal>
      <EnumVal ord="53">1/s</EnumVal>
      <EnumVal ord="54">rad/s</EnumVal>
      <EnumVal ord="55">W/m²</EnumVal>
      <EnumVal ord="56">J/m²</EnumVal>
      <EnumVal ord="57">S/m</EnumVal>
      <EnumVal ord="58">K/s</EnumVal>
      <EnumVal ord="59">Pa/s</EnumVal>
      <EnumVal ord="60">J/kg K</EnumVal>
      <EnumVal ord="61">VA</EnumVal>
      <EnumVal ord="62">Watts</EnumVal>
      <EnumVal ord="63">VAr</EnumVal>
      <EnumVal ord="64">phi</EnumVal>
      <EnumVal ord="65">cos(phi)</EnumVal>
      <EnumVal ord="66">Vs</EnumVal>
      <EnumVal ord="67">V²</EnumVal>
      <EnumVal ord="68">As</EnumVal>
      <EnumVal ord="69">A²</EnumVal>
      <EnumVal ord="70">A²t</EnumVal>
      <EnumVal ord="71">VAh</EnumVal>
      <EnumVal ord="72">Wh</EnumVal>
      <EnumVal ord="73">VArh</EnumVal>
      <EnumVal ord="74">V/Hz</EnumVal>
      <EnumVal ord="75">Hz/s</EnumVal>
      <EnumVal ord="76">char</EnumVal>
      <EnumVal ord="77">char/s</EnumVal>
      <EnumVal ord="78">kgm²</EnumVal>
      <EnumVal ord="79">dB</EnumVal>
      <EnumVal ord="80">J/Wh</EnumVal>
      <EnumVal ord="81">W/s</EnumVal>
      <EnumVal ord="82">l/s</EnumVal>
      <EnumVal ord="83">dBm</EnumVal>
      <EnumVal ord="84">h</EnumVal>
      <EnumVal ord="85">min</EnumVal>
      <EnumVal ord="86">Ohm/m</EnumVal>
      <EnumVal ord="87">percent/s</EnumVal>
    </EnumType>

    <EnumType id="SboClassKind">
      <EnumVal ord="0">operate-once</EnumVal>
      <EnumVal ord="1">operate-many</EnumVal>
    </EnumType>
    <EnumType id="SequenceKind">
      <EnumVal ord="0">pos-neg-zero</EnumVal>
      <EnumVal ord="1">dir-quad-zero</EnumVal>
    </EnumType>
    <EnumType id="SeverityKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">critical</EnumVal>
      <EnumVal ord="2">major</EnumVal>
      <EnumVal ord="3">minor</EnumVal>
      <EnumVal ord="4">warning</EnumVal>
    </EnumType>
    <EnumType id="WeekdayKind">
      <EnumVal ord="0">reserved</EnumVal>
      <EnumVal ord="1">Monday</EnumVal>
      <EnumVal ord="2">Tuesday</EnumVal>
      <EnumVal ord="3">Wednesday</EnumVal>
      <EnumVal ord="4">Thursday</EnumVal>
      <EnumVal ord="5">Friday</EnumVal>
      <EnumVal ord="6">Saturday</EnumVal>
      <EnumVal ord="7">Sunday</EnumVal>
    </EnumType>
    <EnumType id="AdjustmentKind">
      <EnumVal ord="1">Completed</EnumVal>
      <EnumVal ord="2">Cancelled</EnumVal>
      <EnumVal ord="3">New adjustments</EnumVal>
      <EnumVal ord="4">Under way</EnumVal>
    </EnumType>
    <EnumType id="AffectedPhasesKind">
      <EnumVal ord="1">PhaseA</EnumVal>
      <EnumVal ord="2">PhaseB</EnumVal>
      <EnumVal ord="3">PhaseAB</EnumVal>
      <EnumVal ord="4">PhaseC</EnumVal>
      <EnumVal ord="5">PhaseAC</EnumVal>
      <EnumVal ord="6">PhaseBC</EnumVal>
      <EnumVal ord="7">PhaseABC</EnumVal>
      <EnumVal ord="8">None</EnumVal>
    </EnumType>
    <EnumType id="AutoReclosingKind">
      <EnumVal ord="1">Ready</EnumVal>
      <EnumVal ord="2">InProgress</EnumVal>
        <!-- deprecated; kept for backwards compatibility -->
      <EnumVal ord="3">Successful</EnumVal>
      <EnumVal ord="4">WaitingForTrip</EnumVal>
      <EnumVal ord="5">TripFromProtection</EnumVal>
      <EnumVal ord="6">FaultDisappeared</EnumVal>
      <EnumVal ord="7">WaitToComplete</EnumVal>
      <EnumVal ord="8">CBclosed</EnumVal>
      <EnumVal ord="9">CycleUnsuccessful</EnumVal>
      <EnumVal ord="10">Unsuccessful</EnumVal>
      <EnumVal ord="11">Aborted</EnumVal>
      <EnumVal ord="12">NotReady</EnumVal>
    </EnumType>
    <EnumType id="BreakerOpCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Open</EnumVal>
      <EnumVal ord="3">Close-Open</EnumVal>
      <EnumVal ord="4">Open-Close-Open</EnumVal>
      <EnumVal ord="5">Close-Open-Close-Open</EnumVal>
      <EnumVal ord="6">Open-Close-Open-Close-Open</EnumVal>
      <EnumVal ord="7">more</EnumVal>
    </EnumType>
    <EnumType id="CalcIntervalKind">
      <EnumVal ord="1">MS</EnumVal>
      <EnumVal ord="2">PER_CYCLE</EnumVal>
      <EnumVal ord="3">CYCLE</EnumVal>
      <EnumVal ord="4">DAY</EnumVal>
      <EnumVal ord="5">WEEK</EnumVal>
      <EnumVal ord="6">MONTH</EnumVal>
      <EnumVal ord="7">YEAR</EnumVal>
      <EnumVal ord="8">EXTERNAL</EnumVal>
    </EnumType>
    <EnumType id="CalcMethodKind">
      <EnumVal ord="1">UNSPECIFIED</EnumVal>
      <EnumVal ord="2">TRUE_RMS</EnumVal>
      <EnumVal ord="3">PEAK_FUNDAMENTAL</EnumVal>
      <EnumVal ord="4">RMS_FUNDAMENTAL</EnumVal>
      <EnumVal ord="5">MIN</EnumVal>
      <EnumVal ord="6">MAX</EnumVal>
      <EnumVal ord="7">AVG</EnumVal>
      <EnumVal ord="8">SDV</EnumVal>
      <EnumVal ord="9">PREDICTION</EnumVal>
      <EnumVal ord="10">RATE</EnumVal>
      <EnumVal ord="11">P-CLASS</EnumVal>
      <EnumVal ord="12">M-CLASS</EnumVal>
      <EnumVal ord="13">DIFF</EnumVal>
    </EnumType>
    <EnumType id="CalcModeKind">
      <EnumVal ord="1">TOTAL</EnumVal>
      <EnumVal ord="2">PERIOD</EnumVal>
      <EnumVal ord="3">SLIDING</EnumVal>
    </EnumType>
    <EnumType id="ClockSourceKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">SNTP</EnumVal>
      <EnumVal ord="3">PTP</EnumVal>
      <EnumVal ord="4">IRIG-B</EnumVal>
      <EnumVal ord="5">Substation internal</EnumVal>
    </EnumType>
    <EnumType id="ClockSyncKind">
      <EnumVal ord="1">InternalClock</EnumVal>
      <EnumVal ord="2">LocalAreaClock</EnumVal>
      <EnumVal ord="3">GlobalAreaClock</EnumVal>
    </EnumType>
    <EnumType id="ClockSyncLockingKind">
      <EnumVal ord="1">Locked</EnumVal>
      <EnumVal ord="2">Unlocked10s</EnumVal>
      <EnumVal ord="3">Unlocked100s</EnumVal>
      <EnumVal ord="4">Unlocked1000s</EnumVal>
      <EnumVal ord="5">UnlockedMoreThan1000s</EnumVal>
    </EnumType>
    <EnumType id="DirectionModeKind">
      <EnumVal ord="1">NonDirectional</EnumVal>
      <EnumVal ord="2">Forward</EnumVal>
      <EnumVal ord="3">Reverse</EnumVal>
    </EnumType>
    <EnumType id="FailureDetectionKind">
      <EnumVal ord="1">Current</EnumVal>
      <EnumVal ord="2">Breaker Status</EnumVal>
      <EnumVal ord="3">Both current and breaker status</EnumVal>
      <EnumVal ord="4">Other</EnumVal>
    </EnumType>
    <EnumType id="FaultLoopKind">
      <EnumVal ord="1">PhaseAtoGround</EnumVal>
      <EnumVal ord="2">PhaseBtoGround</EnumVal>
      <EnumVal ord="3">PhaseCtoGround</EnumVal>
      <EnumVal ord="4">PhaseAtoB</EnumVal>
      <EnumVal ord="5">PhaseBtoC</EnumVal>
      <EnumVal ord="6">PhaseCtoA</EnumVal>
      <EnumVal ord="7">Others</EnumVal>
    </EnumType>
    <EnumType id="FaultMeasuredValueTypeKind">
      <EnumVal ord="1">At Start Moment</EnumVal>
      <EnumVal ord="2">At Trip Moment</EnumVal>
      <EnumVal ord="3">Peak Fault Value</EnumVal>
    </EnumType>
    <EnumType id="FilterFunctionKind">
      <EnumVal ord="1">Low pass</EnumVal>
      <EnumVal ord="2">High pass</EnumVal>
      <EnumVal ord="3">Bandpass</EnumVal>
      <EnumVal ord="4">Bandstop</EnumVal>
      <EnumVal ord="5">Deadband</EnumVal>
    </EnumType>
    <EnumType id="FuseFunctionKind">
      <EnumVal ord="1">Slow time delay</EnumVal>
      <EnumVal ord="2">Fast time delay</EnumVal>
      <EnumVal ord="3">Fast acting</EnumVal>
      <EnumVal ord="4">Very fast acting</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="HealthKind">
      <EnumVal ord="1">Ok</EnumVal>
      <EnumVal ord="2">Warning</EnumVal>
      <EnumVal ord="3">Alarm</EnumVal>
    </EnumType>
    <EnumType id="InstrumentTransformerMeasurementRatingKind">
      <EnumVal ord="1">0.05</EnumVal>
      <EnumVal ord="2">0.1</EnumVal>
      <EnumVal ord="3">0.2</EnumVal>
      <EnumVal ord="4">0.2S</EnumVal>
      <EnumVal ord="5">0.5</EnumVal>
      <EnumVal ord="6">0.5S</EnumVal>
      <EnumVal ord="7">1</EnumVal>
      <EnumVal ord="8">3</EnumVal>
      <EnumVal ord="9">5</EnumVal>
    </EnumType>
    <EnumType id="InstrumentTransformerProtectionRatingKind">
      <EnumVal ord="1">1</EnumVal>
      <EnumVal ord="2">3</EnumVal>
      <EnumVal ord="3">5</EnumVal>
      <EnumVal ord="4">6</EnumVal>
      <EnumVal ord="5">10</EnumVal>
    </EnumType>
    <EnumType id="LeapSecondKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">Normal Time</EnumVal>
      <EnumVal ord="3">Last minute of the day has 61 seconds</EnumVal>
      <EnumVal ord="4">Last minute of the day has 59 seconds</EnumVal>
    </EnumType>
    <EnumType id="LevelTriggerModeKind">
      <EnumVal ord="1">Positive or Rising</EnumVal>
      <EnumVal ord="2">Negative or Falling</EnumVal>
      <EnumVal ord="3">Both</EnumVal>
      <EnumVal ord="4">Other</EnumVal>
    </EnumType>
    <EnumType id="LiveDeadModeKind">
      <EnumVal ord="1">Dead Line, Dead Bus</EnumVal>
      <EnumVal ord="2">Live Line, Dead Bus</EnumVal>
      <EnumVal ord="3">Dead Line, Live Bus</EnumVal>
      <EnumVal ord="4">Dead Line, Dead Bus OR Live Line, Dead Bus</EnumVal>
      <EnumVal ord="5">Dead Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
      <EnumVal ord="6">Live Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
      <EnumVal ord="7">Dead Line, Dead Bus OR Live Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
    </EnumType>
    <EnumType id="MaterialKind">
      <EnumVal ord="1">Air</EnumVal>
      <EnumVal ord="2">Water</EnumVal>
      <EnumVal ord="3">Steam</EnumVal>
      <EnumVal ord="4">Oil</EnumVal>
      <EnumVal ord="5">Hydrogen</EnumVal>
      <EnumVal ord="6">Natural gas</EnumVal>
      <EnumVal ord="7">Butane</EnumVal>
      <EnumVal ord="8">Propane</EnumVal>
      <EnumVal ord="9">Waste gas</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="MaterialStateKind">
      <EnumVal ord="1">Gaseous</EnumVal>
      <EnumVal ord="2">Liquid</EnumVal>
      <EnumVal ord="3">Solid</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="PFSignKind">
      <EnumVal ord="1">IEC</EnumVal>
      <EnumVal ord="2">EEI</EnumVal>
    </EnumType>
    <EnumType id="PIDAlgorithmKind">
      <EnumVal ord="1">P</EnumVal>
      <EnumVal ord="2">I</EnumVal>
      <EnumVal ord="3">D</EnumVal>
      <EnumVal ord="4">PI</EnumVal>
      <EnumVal ord="5">PD</EnumVal>
      <EnumVal ord="6">ID</EnumVal>
      <EnumVal ord="7">PID</EnumVal>
    </EnumType>
    <EnumType id="POWSwitchingCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Close</EnumVal>
      <EnumVal ord="3">Open</EnumVal>
      <EnumVal ord="4">Close and Open</EnumVal>
    </EnumType>
    <EnumType id="ParallelCoilModeKind">
      <EnumVal ord="1">Master/Slave</EnumVal>
      <EnumVal ord="2">Master/Slave with fixed slave position</EnumVal>
      <EnumVal ord="3">Master/Slave with variable slave position</EnumVal>
      <EnumVal ord="4">Parallel operation without communication</EnumVal>
    </EnumType>
    <EnumType id="ParallelCtrlModeKind">
      <EnumVal ord="1">Master</EnumVal>
      <EnumVal ord="2">Slave</EnumVal>
      <EnumVal ord="3">Independent</EnumVal>
    </EnumType>
    <EnumType id="ParallelTransfModeKind">
      <EnumVal ord="1">No Mode predefined</EnumVal>
      <EnumVal ord="2">Master</EnumVal>
      <EnumVal ord="3">Follower</EnumVal>
      <EnumVal ord="4">Power Factor</EnumVal>
      <EnumVal ord="5">Negative Reactance</EnumVal>
      <EnumVal ord="6">Circulating Current</EnumVal>
      <EnumVal ord="7">Circulating Reactive Current (var balancing)</EnumVal>
      <EnumVal ord="8">Circulating Reactive Current by equalizing power factor</EnumVal>
    </EnumType>
    <EnumType id="PolarizingQuantityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Zero Sequence Current</EnumVal>
      <EnumVal ord="3">Zero Sequence Voltage</EnumVal>
      <EnumVal ord="4">Negative Sequence Voltage</EnumVal>
      <EnumVal ord="5">Phase to Phase Voltages</EnumVal>
      <EnumVal ord="6">Phase to Ground Voltages</EnumVal>
      <EnumVal ord="7">Positive sequence voltage</EnumVal>
    </EnumType>
    <EnumType id="RecordingModeKind">
      <EnumVal ord="1">Overwrite existing values</EnumVal>
      <EnumVal ord="2">Stop when full or saturated</EnumVal>
    </EnumType>
    <EnumType id="RectifierControlModeKind">
      <EnumVal ord="1">Current</EnumVal>
      <EnumVal ord="2">Voltage</EnumVal>
      <EnumVal ord="3">Active Power</EnumVal>
    </EnumType>
    <EnumType id="ResetCurveKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Definite Time Delayed Reset</EnumVal>
      <EnumVal ord="3">Inverse Reset</EnumVal>
    </EnumType>
    <EnumType id="RestraintModeKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Harmonic2</EnumVal>
      <EnumVal ord="3">Harmonic5</EnumVal>
      <EnumVal ord="4">Harmonic2and5</EnumVal>
      <EnumVal ord="5">WaveformAnalysis</EnumVal>
      <EnumVal ord="6">WaveformAnalysisAndHarmonic2</EnumVal>
      <EnumVal ord="7">Other</EnumVal>
      <EnumVal ord="8">WaveformAnalysisAndHarmonic5</EnumVal>
      <EnumVal ord="9">WaveformAnalysisAndHarmonic2AndHarmonic5</EnumVal>
    </EnumType>
    <EnumType id="RetripModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Without Check</EnumVal>
      <EnumVal ord="3">With Current Check</EnumVal>
      <EnumVal ord="4">With Breaker Status Check</EnumVal>
      <EnumVal ord="5">With Current and Breaker Status Check</EnumVal>
      <EnumVal ord="6">Other Checks</EnumVal>
    </EnumType>
    <EnumType id="RotatingMachineStateKind">
      <EnumVal ord="1">Stopped</EnumVal>
      <EnumVal ord="2">Stopping</EnumVal>
      <EnumVal ord="3">Started</EnumVal>
      <EnumVal ord="4">Starting</EnumVal>
      <EnumVal ord="5">Disabled</EnumVal>
    </EnumType>
    <EnumType id="RotationalDirectionKind">
      <EnumVal ord="1">Clockwise</EnumVal>
      <EnumVal ord="2">Counter-Clockwise</EnumVal>
      <EnumVal ord="3">Unknown</EnumVal>
    </EnumType>
    <EnumType id="RotorThermalStateKind">
      <EnumVal ord="1">Cold</EnumVal>
      <EnumVal ord="2">Warm</EnumVal>
      <EnumVal ord="3">Overload</EnumVal>
    </EnumType>
    <EnumType id="SOFEnablingModeKind">
      <EnumVal ord="1">SwitchCommand</EnumVal>
      <EnumVal ord="2">BreakerClosed</EnumVal>
      <EnumVal ord="3">VoltageAndCurrentLevel</EnumVal>
    </EnumType>
    <EnumType id="SOFOperationModeKind">
      <EnumVal ord="1">ExternalSignal</EnumVal>
      <EnumVal ord="2">VoltageAndCurrent</EnumVal>
      <EnumVal ord="3">ExternalSignal or VoltageAndCurrent</EnumVal>
    </EnumType>
    <EnumType id="STotalCalcMethodKind">
      <EnumVal ord="1">Vector</EnumVal>
      <EnumVal ord="2">Arithmetic</EnumVal>
    </EnumType>
    <EnumType id="ScheduleEnablingErrorKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Missing valid NumEnt</EnumVal>
      <EnumVal ord="3">Missing valid SchdIntv</EnumVal>
      <EnumVal ord="4">Missing valid schedule values</EnumVal>
      <EnumVal ord="5">Inconsistent values CDC</EnumVal>
      <EnumVal ord="6">Missing valid StrTm</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="ScheduleStateKind">
      <EnumVal ord="1">Not ready</EnumVal>
      <EnumVal ord="2">Start Time required</EnumVal>
      <EnumVal ord="3">Ready</EnumVal>
      <EnumVal ord="4">Running</EnumVal>
    </EnumType>
    <EnumType id="SetpointEndKind">
      <EnumVal ord="1">Ended normally</EnumVal>
      <EnumVal ord="2">Ended with overshoot</EnumVal>
      <EnumVal ord="3">Cancelled: measurement was deviating</EnumVal>
      <EnumVal ord="4">Cancelled: loss of communication with dispatch centre</EnumVal>
      <EnumVal ord="5">Cancelled: loss of communication with local area network</EnumVal>
      <EnumVal ord="6">Cancelled: loss of communication with the local interface</EnumVal>
      <EnumVal ord="7">Cancelled: timeout</EnumVal>
      <EnumVal ord="8">Cancelled: voluntarily</EnumVal>
      <EnumVal ord="9">Cancelled: noisy environments</EnumVal>
      <EnumVal ord="10">Cancelled: material failure</EnumVal>
      <EnumVal ord="11">Cancelled: new set-point request</EnumVal>
      <EnumVal ord="12">Cancelled: improper environment (blockage)</EnumVal>
      <EnumVal ord="13">Cancelled: stability time was reached</EnumVal>
      <EnumVal ord="14">Cancelled: immobilisation time was reached</EnumVal>
      <EnumVal ord="15">Cancelled: equipment was in the wrong mode</EnumVal>
      <EnumVal ord="16">Unknown causes</EnumVal>
    </EnumType>
    <EnumType id="StageControlKind">
      <EnumVal ord="1">Inactive</EnumVal>
      <EnumVal ord="2">Stage1</EnumVal>
      <EnumVal ord="3">Stage2</EnumVal>
      <EnumVal ord="4">Stage3</EnumVal>
    </EnumType>
    <EnumType id="SwitchFunctionKind">
      <EnumVal ord="1">Load Break</EnumVal>
      <EnumVal ord="2">Disconnector</EnumVal>
      <EnumVal ord="3">Earthing Switch</EnumVal>
      <EnumVal ord="4">High Speed Earthing Switch</EnumVal>
    </EnumType>
    <EnumType id="SwitchingCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Open</EnumVal>
      <EnumVal ord="3">Close</EnumVal>
      <EnumVal ord="4">Open and Close</EnumVal>
    </EnumType>
    <EnumType id="SynchOperationModeKind">
      <EnumVal ord="1">Automatic-synchronizing</EnumVal>
      <EnumVal ord="2">Automatic-paralleling</EnumVal>
      <EnumVal ord="3">Manual</EnumVal>
      <EnumVal ord="4">Test</EnumVal>
    </EnumType>
    <EnumType id="TankFillKind">
      <EnumVal ord="1">pressure only</EnumVal>
      <EnumVal ord="2">level only</EnumVal>
      <EnumVal ord="3">both pressure and level</EnumVal>
    </EnumType>
    <EnumType id="TransientPerformanceClassKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">P</EnumVal>
      <EnumVal ord="3">PR</EnumVal>
      <EnumVal ord="4">PX</EnumVal>
      <EnumVal ord="5">PXR</EnumVal>
      <EnumVal ord="6">TPX</EnumVal>
      <EnumVal ord="7">TPY</EnumVal>
      <EnumVal ord="8">TPZ</EnumVal>
      <EnumVal ord="9">TPE</EnumVal>
    </EnumType>
    <EnumType id="TpcAppModeKind">
      <EnumVal ord="1">Unused</EnumVal>
      <EnumVal ord="2">Blocking</EnumVal>
      <EnumVal ord="3">Permissive</EnumVal>
      <EnumVal ord="4">Direct</EnumVal>
      <EnumVal ord="5">Unblocking</EnumVal>
      <EnumVal ord="6">Status</EnumVal>
    </EnumType>
    <EnumType id="TriggerSourceKind">
      <EnumVal ord="1">Internal</EnumVal>
      <EnumVal ord="2">External</EnumVal>
      <EnumVal ord="3">Both</EnumVal>
    </EnumType>
    <EnumType id="TripBehaviourKind">
      <EnumVal ord="1">Single Pole Tripping</EnumVal>
      <EnumVal ord="2">Undefined</EnumVal>
      <EnumVal ord="3">Three Pole Tripping</EnumVal>
    </EnumType>
    <EnumType id="TripModeKind">
      <EnumVal ord="1">3 phase tripping</EnumVal>
      <EnumVal ord="2">1 or 3 phase tripping</EnumVal>
      <EnumVal ord="3">specific</EnumVal>
      <EnumVal ord="4">1 phase tripping</EnumVal>
    </EnumType>
    <EnumType id="TuningKind">
      <EnumVal ord="1">Not tuned</EnumVal>
      <EnumVal ord="2">Tuned</EnumVal>
      <EnumVal ord="3">Tuned but not compensated</EnumVal>
      <EnumVal ord="4">Umax</EnumVal>
      <EnumVal ord="5">Umax but not compensated</EnumVal>
      <EnumVal ord="6">Umax but not compensated due to U continous limitation</EnumVal>
    </EnumType>
    <EnumType id="UnbalanceDetectionKind">
      <EnumVal ord="1">Negative sequence</EnumVal>
      <EnumVal ord="2">Zero sequence</EnumVal>
      <EnumVal ord="3">Neg-pos sequence</EnumVal>
      <EnumVal ord="4">Zero-pos sequence</EnumVal>
      <EnumVal ord="5">Phase vector comparison</EnumVal>
      <EnumVal ord="6">Others</EnumVal>
    </EnumType>
    <EnumType id="UnblockModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Permanent</EnumVal>
      <EnumVal ord="3">Time window</EnumVal>
    </EnumType>
    <EnumType id="VoltInterruptDetectionKind">
      <EnumVal ord="1">Voltage</EnumVal>
      <EnumVal ord="2">Voltage and Current</EnumVal>
      <EnumVal ord="3">Voltage and Normally Open breaker contact</EnumVal>
      <EnumVal ord="4">Voltage and Normally Closed breaker contact</EnumVal>
      <EnumVal ord="5">Voltage and Normally Open and Normally Closed breaker contacts</EnumVal>
      <EnumVal ord="6">Normally Open breaker contact</EnumVal>
      <EnumVal ord="7">Normally Closed breaker contact</EnumVal>
      <EnumVal ord="8">Both Normally Open and Normally Closed breaker contacts</EnumVal>
    </EnumType>
    <EnumType id="WeakEndInfeedModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Operate</EnumVal>
      <EnumVal ord="3">Echo</EnumVal>
      <EnumVal ord="4">Echo and Operate</EnumVal>
    </EnumType>
  </DataTypeTemplate>
</SCL>
