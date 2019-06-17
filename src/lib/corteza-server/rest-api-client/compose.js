import axios from 'axios'

/* eslint-disable */

// This is a generated file.
// See README.md file for update instructions

export default class Compose {
  constructor ({baseURL, headers, jwt} = {}) {
    this.jwt = null
    this.baseURL = baseURL

    this.headers = {
      'Content-Type': 'application/json',
    }

    this.setHeaders(headers)

    jwt = jwt || localStorage.getItem('auth.jwt')

    if (this.isValidJWT(jwt)) {
      this.setJWT(jwt)
    }
  }

  setJWT (jwt) {
    if (this.isValidJWT(jwt)) {
      this.jwt = jwt
      this.headers['Authorization'] = 'Bearer ' + jwt
    } else {
      throw new Error('JWT value too short', {
        jwt,
      })
    }

    return this
  }

  setHeaders (headers) {
    if (typeof headers === 'object') {
      this.headers = headers
    }

    return this
  }

  isValidJWT (jwt) {
    return jwt && jwt.length > 100
  }

  stdReject (reject) {
    return (error) => {
      reject(error)
    }
  }

  stdResolve (resolve, reject) {
    return (response) => {
      if (response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data.response)
      }
    }
  }

  api () {
    return axios.create({
      withCredentials: true,
      baseURL: this.baseURL,
      headers: this.headers,
    })
  }

  // List namespaces
  async namespaceList ({query, page, perPage, } = {}) {


    let cfg = {
      method: 'get',
      url: this.namespaceListEndpoint({  }),
    }
    cfg.params = {
      query,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  namespaceListEndpoint () {
    return `/namespace/`
  }

  // Create namespace
  async namespaceCreate ({name, slug, enabled, meta, } = {}) {
    if (!name) {
      throw Error('Field name is empty')
    }
    if (!meta) {
      throw Error('Field meta is empty')
    }

    let cfg = {
      method: 'post',
      url: this.namespaceCreateEndpoint({  }),
    }

    cfg.data = {
      name,
      slug,
      enabled,
      meta,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  namespaceCreateEndpoint () {
    return `/namespace/`
  }

  // Read namespace
  async namespaceRead ({namespaceID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.namespaceReadEndpoint({
        namespaceID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  namespaceReadEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}`
  }

  // Update namespace
  async namespaceUpdate ({namespaceID, name, slug, enabled, meta, updatedAt, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }
    if (!meta) {
      throw Error('Field meta is empty')
    }

    let cfg = {
      method: 'post',
      url: this.namespaceUpdateEndpoint({
        namespaceID,
      }),
    }

    cfg.data = {
      name,
      slug,
      enabled,
      meta,
      updatedAt,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  namespaceUpdateEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}`
  }

  // Delete namespace
  async namespaceDelete ({namespaceID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.namespaceDeleteEndpoint({
        namespaceID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  namespaceDeleteEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}`
  }

  // List available pages
  async pageList ({namespaceID, selfID, query, page, perPage, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.pageListEndpoint({
        namespaceID,
      }),
    }
    cfg.params = {
      selfID,
      query,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageListEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/page/`
  }

  // Create page
  async pageCreate ({namespaceID, selfID, moduleID, title, description, visible, blocks, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!title) {
      throw Error('Field title is empty')
    }
    if (!blocks) {
      throw Error('Field blocks is empty')
    }

    let cfg = {
      method: 'post',
      url: this.pageCreateEndpoint({
        namespaceID,
      }),
    }

    cfg.data = {
      selfID,
      moduleID,
      title,
      description,
      visible,
      blocks,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageCreateEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/page/`
  }

  // Get page details
  async pageRead ({namespaceID, pageID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!pageID) {
      throw Error('Field pageID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.pageReadEndpoint({
        namespaceID,
        pageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageReadEndpoint ({namespaceID, pageID, } = {}) {
    return `/namespace/${namespaceID}/page/${pageID}`
  }

  // Get page all (non-record) pages, hierarchically
  async pageTree ({namespaceID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.pageTreeEndpoint({
        namespaceID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageTreeEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/page/tree`
  }

  // Update page
  async pageUpdate ({namespaceID, pageID, selfID, moduleID, title, description, visible, blocks, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!pageID) {
      throw Error('Field pageID is empty')
    }
    if (!title) {
      throw Error('Field title is empty')
    }
    if (!blocks) {
      throw Error('Field blocks is empty')
    }

    let cfg = {
      method: 'post',
      url: this.pageUpdateEndpoint({
        namespaceID,
        pageID,
      }),
    }

    cfg.data = {
      selfID,
      moduleID,
      title,
      description,
      visible,
      blocks,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageUpdateEndpoint ({namespaceID, pageID, } = {}) {
    return `/namespace/${namespaceID}/page/${pageID}`
  }

  // Reorder pages
  async pageReorder ({namespaceID, selfID, pageIDs, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!selfID) {
      throw Error('Field selfID is empty')
    }
    if (!pageIDs) {
      throw Error('Field pageIDs is empty')
    }

    let cfg = {
      method: 'post',
      url: this.pageReorderEndpoint({
        namespaceID,
        selfID,
      }),
    }

    cfg.data = {
      pageIDs,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageReorderEndpoint ({namespaceID, selfID, } = {}) {
    return `/namespace/${namespaceID}/page/${selfID}/reorder`
  }

  // Delete page
  async pageDelete ({namespaceID, pageID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!pageID) {
      throw Error('Field pageID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.pageDeleteEndpoint({
        namespaceID,
        pageID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageDeleteEndpoint ({namespaceID, pageID, } = {}) {
    return `/namespace/${namespaceID}/page/${pageID}`
  }

  // Uploads attachment to page
  async pageUpload ({namespaceID, pageID, upload, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!pageID) {
      throw Error('Field pageID is empty')
    }
    if (!upload) {
      throw Error('Field upload is empty')
    }

    let cfg = {
      method: 'post',
      url: this.pageUploadEndpoint({
        namespaceID,
        pageID,
      }),
    }

    cfg.data = {
      upload,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  pageUploadEndpoint ({namespaceID, pageID, } = {}) {
    return `/namespace/${namespaceID}/page/${pageID}/attachment`
  }

  // List modules
  async moduleList ({namespaceID, query, page, perPage, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.moduleListEndpoint({
        namespaceID,
      }),
    }
    cfg.params = {
      query,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  moduleListEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/module/`
  }

  // Create module
  async moduleCreate ({namespaceID, name, fields, meta, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }
    if (!fields) {
      throw Error('Field fields is empty')
    }
    if (!meta) {
      throw Error('Field meta is empty')
    }

    let cfg = {
      method: 'post',
      url: this.moduleCreateEndpoint({
        namespaceID,
      }),
    }

    cfg.data = {
      name,
      fields,
      meta,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  moduleCreateEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/module/`
  }

  // Read module
  async moduleRead ({namespaceID, moduleID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.moduleReadEndpoint({
        namespaceID,
        moduleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  moduleReadEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}`
  }

  // Update module
  async moduleUpdate ({namespaceID, moduleID, name, fields, meta, updatedAt, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }
    if (!fields) {
      throw Error('Field fields is empty')
    }
    if (!meta) {
      throw Error('Field meta is empty')
    }

    let cfg = {
      method: 'post',
      url: this.moduleUpdateEndpoint({
        namespaceID,
        moduleID,
      }),
    }

    cfg.data = {
      name,
      fields,
      meta,
      updatedAt,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  moduleUpdateEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}`
  }

  // Delete module
  async moduleDelete ({namespaceID, moduleID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.moduleDeleteEndpoint({
        namespaceID,
        moduleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  moduleDeleteEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}`
  }

  // Generates report from module records
  async recordReport ({namespaceID, moduleID, metrics, dimensions, filter, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!dimensions) {
      throw Error('Field dimensions is empty')
    }

    let cfg = {
      method: 'get',
      url: this.recordReportEndpoint({
        namespaceID,
        moduleID,
      }),
    }
    cfg.params = {
      metrics,
      dimensions,
      filter,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordReportEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/report`
  }

  // List/read records from module section
  async recordList ({namespaceID, moduleID, filter, page, perPage, sort, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.recordListEndpoint({
        namespaceID,
        moduleID,
      }),
    }
    cfg.params = {
      filter,
      page,
      perPage,
      sort,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordListEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/`
  }

  // Create record in module section
  async recordCreate ({namespaceID, moduleID, values, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!values) {
      throw Error('Field values is empty')
    }

    let cfg = {
      method: 'post',
      url: this.recordCreateEndpoint({
        namespaceID,
        moduleID,
      }),
    }

    cfg.data = {
      values,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordCreateEndpoint ({namespaceID, moduleID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/`
  }

  // Read records by ID from module section
  async recordRead ({namespaceID, moduleID, recordID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!recordID) {
      throw Error('Field recordID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.recordReadEndpoint({
        namespaceID,
        moduleID,
        recordID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordReadEndpoint ({namespaceID, moduleID, recordID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/${recordID}`
  }

  // Update records in module section
  async recordUpdate ({namespaceID, moduleID, recordID, values, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!recordID) {
      throw Error('Field recordID is empty')
    }
    if (!values) {
      throw Error('Field values is empty')
    }

    let cfg = {
      method: 'post',
      url: this.recordUpdateEndpoint({
        namespaceID,
        moduleID,
        recordID,
      }),
    }

    cfg.data = {
      values,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordUpdateEndpoint ({namespaceID, moduleID, recordID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/${recordID}`
  }

  // Delete record row from module section
  async recordDelete ({namespaceID, moduleID, recordID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!recordID) {
      throw Error('Field recordID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.recordDeleteEndpoint({
        namespaceID,
        moduleID,
        recordID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordDeleteEndpoint ({namespaceID, moduleID, recordID, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/${recordID}`
  }

  // Uploads attachment and validates it against record field requirements
  async recordUpload ({namespaceID, moduleID, recordID, fieldName, upload, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!moduleID) {
      throw Error('Field moduleID is empty')
    }
    if (!recordID) {
      throw Error('Field recordID is empty')
    }
    if (!fieldName) {
      throw Error('Field fieldName is empty')
    }
    if (!upload) {
      throw Error('Field upload is empty')
    }

    let cfg = {
      method: 'post',
      url: this.recordUploadEndpoint({
        namespaceID,
        moduleID,
        recordID,
        fieldName,
      }),
    }

    cfg.data = {
      upload,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  recordUploadEndpoint ({namespaceID, moduleID, recordID, fieldName, } = {}) {
    return `/namespace/${namespaceID}/module/${moduleID}/record/${recordID}/${fieldName}/attachment`
  }

  // List/read charts
  async chartList ({namespaceID, query, page, perPage, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.chartListEndpoint({
        namespaceID,
      }),
    }
    cfg.params = {
      query,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  chartListEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/chart/`
  }

  // List/read charts
  async chartCreate ({namespaceID, config, name, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!config) {
      throw Error('Field config is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.chartCreateEndpoint({
        namespaceID,
      }),
    }

    cfg.data = {
      config,
      name,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  chartCreateEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/chart/`
  }

  // Read charts by ID
  async chartRead ({namespaceID, chartID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!chartID) {
      throw Error('Field chartID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.chartReadEndpoint({
        namespaceID,
        chartID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  chartReadEndpoint ({namespaceID, chartID, } = {}) {
    return `/namespace/${namespaceID}/chart/${chartID}`
  }

  // Add/update charts
  async chartUpdate ({namespaceID, chartID, config, name, updatedAt, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!chartID) {
      throw Error('Field chartID is empty')
    }
    if (!config) {
      throw Error('Field config is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.chartUpdateEndpoint({
        namespaceID,
        chartID,
      }),
    }

    cfg.data = {
      config,
      name,
      updatedAt,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  chartUpdateEndpoint ({namespaceID, chartID, } = {}) {
    return `/namespace/${namespaceID}/chart/${chartID}`
  }

  // Delete chart
  async chartDelete ({namespaceID, chartID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!chartID) {
      throw Error('Field chartID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.chartDeleteEndpoint({
        namespaceID,
        chartID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  chartDeleteEndpoint ({namespaceID, chartID, } = {}) {
    return `/namespace/${namespaceID}/chart/${chartID}`
  }

  // List available triggers
  async triggerList ({namespaceID, moduleID, query, page, perPage, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.triggerListEndpoint({
        namespaceID,
      }),
    }
    cfg.params = {
      moduleID,
      query,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  triggerListEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/trigger/`
  }

  // Create trigger
  async triggerCreate ({namespaceID, moduleID, name, actions, enabled, source, updatedAt, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.triggerCreateEndpoint({
        namespaceID,
      }),
    }

    cfg.data = {
      moduleID,
      name,
      actions,
      enabled,
      source,
      updatedAt,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  triggerCreateEndpoint ({namespaceID, } = {}) {
    return `/namespace/${namespaceID}/trigger/`
  }

  // Get trigger details
  async triggerRead ({namespaceID, triggerID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!triggerID) {
      throw Error('Field triggerID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.triggerReadEndpoint({
        namespaceID,
        triggerID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  triggerReadEndpoint ({namespaceID, triggerID, } = {}) {
    return `/namespace/${namespaceID}/trigger/${triggerID}`
  }

  // Update trigger
  async triggerUpdate ({namespaceID, triggerID, moduleID, name, actions, enabled, source, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!triggerID) {
      throw Error('Field triggerID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.triggerUpdateEndpoint({
        namespaceID,
        triggerID,
      }),
    }

    cfg.data = {
      moduleID,
      name,
      actions,
      enabled,
      source,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  triggerUpdateEndpoint ({namespaceID, triggerID, } = {}) {
    return `/namespace/${namespaceID}/trigger/${triggerID}`
  }

  // Delete trigger
  async triggerDelete ({namespaceID, triggerID, } = {}) {
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!triggerID) {
      throw Error('Field triggerID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.triggerDeleteEndpoint({
        namespaceID,
        triggerID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  triggerDeleteEndpoint ({namespaceID, triggerID, } = {}) {
    return `/namespace/${namespaceID}/trigger/${triggerID}`
  }

  // Send email from the Compose
  async notificationEmailSend ({to, cc, replyTo, subject, content, } = {}) {
    if (!to) {
      throw Error('Field to is empty')
    }
    if (!content) {
      throw Error('Field content is empty')
    }

    let cfg = {
      method: 'post',
      url: this.notificationEmailSendEndpoint({  }),
    }

    cfg.data = {
      to,
      cc,
      replyTo,
      subject,
      content,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  notificationEmailSendEndpoint () {
    return `/notification/email`
  }

  // List, filter all page attachments
  async attachmentList ({kind, namespaceID, sign, userID, pageID, moduleID, recordID, fieldName, page, perPage, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentListEndpoint({
        kind,
        namespaceID,
      }),
    }
    cfg.params = {
      sign,
      userID,
      pageID,
      moduleID,
      recordID,
      fieldName,
      page,
      perPage,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentListEndpoint ({kind, namespaceID, } = {}) {
    return `/namespace/${namespaceID}/attachment/${kind}/`
  }

  // Attachment details
  async attachmentRead ({kind, namespaceID, attachmentID, sign, userID, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentReadEndpoint({
        kind,
        namespaceID,
        attachmentID,
      }),
    }
    cfg.params = {
      sign,
      userID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentReadEndpoint ({kind, namespaceID, attachmentID, } = {}) {
    return `/namespace/${namespaceID}/attachment/${kind}/${attachmentID}`
  }

  // Delete attachment
  async attachmentDelete ({kind, namespaceID, attachmentID, sign, userID, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.attachmentDeleteEndpoint({
        kind,
        namespaceID,
        attachmentID,
      }),
    }
    cfg.params = {
      sign,
      userID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentDeleteEndpoint ({kind, namespaceID, attachmentID, } = {}) {
    return `/namespace/${namespaceID}/attachment/${kind}/${attachmentID}`
  }

  // Serves attached file
  async attachmentOriginal ({kind, namespaceID, attachmentID, name, sign, userID, download, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentOriginalEndpoint({
        kind,
        namespaceID,
        attachmentID,
        name,
      }),
    }
    cfg.params = {
      sign,
      userID,
      download,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentOriginalEndpoint ({kind, namespaceID, attachmentID, name, } = {}) {
    return `/namespace/${namespaceID}/attachment/${kind}/${attachmentID}/original/${name}`
  }

  // Serves preview of an attached file
  async attachmentPreview ({kind, namespaceID, attachmentID, ext, sign, userID, } = {}) {
    if (!kind) {
      throw Error('Field kind is empty')
    }
    if (!namespaceID) {
      throw Error('Field namespaceID is empty')
    }
    if (!attachmentID) {
      throw Error('Field attachmentID is empty')
    }
    if (!ext) {
      throw Error('Field ext is empty')
    }

    let cfg = {
      method: 'get',
      url: this.attachmentPreviewEndpoint({
        kind,
        namespaceID,
        attachmentID,
        ext,
      }),
    }
    cfg.params = {
      sign,
      userID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  attachmentPreviewEndpoint ({kind, namespaceID, attachmentID, ext, } = {}) {
    return `/namespace/${namespaceID}/attachment/${kind}/${attachmentID}/preview.${ext}`
  }

  // Retrieve defined permissions
  async permissionsList () {


    let cfg = {
      method: 'get',
      url: this.permissionsListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsListEndpoint () {
    return `/permissions/`
  }

  // Effective rules for current user
  async permissionsEffective ({resource, } = {}) {


    let cfg = {
      method: 'get',
      url: this.permissionsEffectiveEndpoint({  }),
    }
    cfg.params = {
      resource,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsEffectiveEndpoint () {
    return `/permissions/effective`
  }

  // Retrieve role permissions
  async permissionsRead ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.permissionsReadEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsReadEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Remove all defined role permissions
  async permissionsDelete ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.permissionsDeleteEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsDeleteEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Update permission settings
  async permissionsUpdate ({roleID, rules, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!rules) {
      throw Error('Field rules is empty')
    }

    let cfg = {
      method: 'patch',
      url: this.permissionsUpdateEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      rules,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsUpdateEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

}
