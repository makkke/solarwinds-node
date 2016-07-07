class VirtualMachine {
  // eslint-disable-next-line max-len
  static props = ['virtualMachineID', 'managedObjectID', 'uuid', 'hostID', 'nodeID', 'resourcePoolID', 'vMConfigFile', 'memoryConfigured', 'memoryShares', 'cPUShares', 'guestState', 'iPAddress', 'logDirectory', 'guestVmWareToolsVersion', 'guestVmWareToolsStatus', 'name', 'guestName', 'guestFamily', 'guestDnsName', 'nicCount', 'vDisksCount', 'processorCount', 'powerState', 'bootTime', 'configStatus', 'overallStatus', 'nodeStatus', 'networkUsageRate', 'networkTransmitRate', 'networkReceiveRate', 'cpuLoad', 'cpuUsageMHz', 'memUsage', 'memUsageMB', 'isLicensed', 'platformID', 'pollingSource', 'relativePath', 'datastoreIdentifier', 'cpuReady', 'swappedMemoryUtilization', 'swappedMemoryUtilizationPercent', 'balloonMemload', 'balloonMemloadPercent', 'iOPSTotal', 'iOPSRead', 'iOPSWrite', 'latencyTotal', 'latencyRead', 'latencyWrite', 'snapshotStorageSize', 'consumedMemLoad', 'consumedPercentMemLoad', 'lastActivityDate', 'totalStorageSize', 'totalStorageSizeUsed', 'volumeSummaryCapacity', 'volumeSummaryFreeSpace', 'volumeSummaryFreeSpacePercent', 'volumeSummaryCapacityDepletionDate', 'triggeredAlarmDescription', 'orionIdPrefix', 'orionIdColumn', 'runTime', 'cpuCostop', 'dynamicMemoryEnabled', 'snapshotSummaryCount', 'dateCreated', 'oldestSnapshotDate', 'heartBeat', 'snapshotDateModified', 'memoryAllocationLimit', 'virtualDiskDateModified', 'detailsUrl', 'status', 'statusDescription', 'statusLED', 'unManaged', 'unManageFrom', 'unManageUntil', 'image', 'ancestorDisplayNames', 'ancestorDetailsUrls', 'statusIconHint', 'displayName', 'description', 'instanceType', 'uri']

  constructor(vm) {
    Object.keys(vm).forEach(key => {
      Object.assign(this, { [key]: vm[key] })
    })
  }

  os() {
    switch (this.guestFamily) {
      case 'windowsGuest':
        return 'Windows'
      case 'linuxGuest':
        return 'Linux'
      default:
        return 'Unknown'
    }
  }
}

export default VirtualMachine
