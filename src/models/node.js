class Node {
  static props = ['nodeID', 'objectSubType', 'iPAddress', 'iPAddressType', 'dynamicIP', 'caption', 'nodeDescription', 'description', 'dns', 'sysName', 'vendor', 'sysObjectID', 'location', 'contact', 'vendorIcon', 'icon', 'status', 'statusLED', 'statusDescription', 'customStatus', 'iOSImage', 'iOSVersion', 'groupStatus', 'statusIcon', 'lastBoot', 'systemUpTime', 'responseTime', 'percentLoss', 'avgResponseTime', 'minResponseTime', 'maxResponseTime', 'cPULoad', 'memoryUsed', 'memoryAvailable', 'percentMemoryUsed', 'percentMemoryAvailable', 'lastSync', 'lastSystemUpTimePollUtc', 'machineType', 'isServer', 'severity', 'uiSeverity', 'childStatus', 'allow64BitCounters', 'agentPort', 'totalMemory', 'cmts', 'customPollerLastStatisticsPoll', 'customPollerLastStatisticsPollSuccess', 'sNMPVersion', 'pollInterval', 'engineID', 'rediscoveryInterval', 'nextPoll', 'nextRediscovery', 'statCollection', 'external', 'community', 'rWCommunity', 'ip', 'ipAddress', 'iPAddressGUID', 'nodeName', 'blockUntil', 'orionIdPrefix', 'orionIdColumn', 'skippedPollingCycles', 'minutesSinceLastSync', 'entityType', 'detailsUrl', 'displayName', 'unManaged', 'unManageFrom', 'unManageUntil', 'image', 'statusIconHint', 'instanceType', 'uri']

  constructor(node) {
    Object.keys(node).forEach(key => {
      Object.assign(this, { [key]: node[key] })
    })

    this.id = node.nodeID
    this.name = node.caption
  }
}

export default Node
