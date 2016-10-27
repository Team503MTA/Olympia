//Define dictionary object
function DictionaryData(key, entity) {
    this.Key = key;
    this.Entity = entity;
}
function UserOnlineOfflineData(userId, isOnline) {
    this.UserId = userId;
    this.IsOnline = isOnline;
}
function MultiHandler(key) {
    this.Key = key;
    this.Handlers = new Array();
}
MultiHandler.prototype.addHandler = function (callback) {
    var result = $func.firstOrDefault(this.Handlers, function (h) { return h === callback; });
    if (result == null) {
        this.Handlers.push(callback);
    }
};
MultiHandler.prototype.removeHandler = function (callback) {
    var result = $func.firstOrDefault(this.Handlers, function (h) { return h === callback; });
    if (result != null) {
        this.Handlers.splice(this.Handlers.indexOf(result), 1);
    }
};
MultiHandler.prototype.sendMessage = function (dataKey, message) {
    try {
        if (this.Handlers == null)
            return;
        var len = this.Handlers.length;
        for (var i = 0; i < len; i++) {
            try {
                var handler = this.Handlers[i];
                if (handler != null) {
                    sendMessageTimeOut(dataKey, handler, message);
                }
            } catch (e) {
                console.error(e);
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};

MultiHandler.prototype.sendMessageListDataCommand = function (listDataCommand, realtimeKey) {
    try {
        if (this.Handlers == null)
            return;
        var len = this.Handlers.length;
        for (var i = 0; i < len; i++) {
            try {
                var handler = this.Handlers[i];
                if (handler != null) {
                    sendMessageListDataTimeOut(listDataCommand, handler, realtimeKey);
                }
            } catch (e) {
                console.error(e);
            }
        }
    } catch (ex) {
        console.error(ex);
    }
};

function sendMessageTimeOut(dataKey, handler, message) {
    setTimeout(handler(dataKey, message), 10);
};

function sendMessageListDataTimeOut(listDataCommand, handler, realtimeKey) {
    setTimeout(handler(listDataCommand, realtimeKey), 10);
};

//define Menu items
function MenuItem(title, key, role, icon, isActive, params) {
    this.Items = new Array();
    this.Title = title;
    this.Key = key;
    this.Role = role;
    this.IconClass = icon ? icon : "";
    this.Visible = this.getVisible();
    this.UrlTemplate = key + ".html";
    this.Active = isActive ? true : false;
    this.Params = params;
}
MenuItem.prototype.getVisible = function () {
    return $operatorManager.hasRole(this.Role);
};
MenuItem.prototype.addMenuItem = function (item) {
    this.Items.push(item);
};
MenuItem.prototype.getParentVisible = function () {
    if (this.Items.length <= 0) {
        return this.Visible;
    }
    var all = $func.findAll(this.Items, function (data) { return data.Visible === true; });
    return all.length > 0 && this.Visible === true;
};
MenuItem.prototype.hasChild = function () {
    return this.Items.length > 0 ? 'has-sub' : '';
};
MenuItem.prototype.getCategoryVisible = function () {
    if (this.Items.length <= 0) {
        return this.Visible;
    }
    var all = $func.findAll(this.Items, function (data) { return data.getParentVisible(); });
    return all.length > 0 && this.Visible === true;
};
MenuItem.prototype.onItemClicked = function (item) {
    try {
        if (item == null/* || item.Items.length > 0*/) return;
        $menuCreator.onMenuClicked(item.Title, item.Key, item.Params);
    } catch (e) {
        console.error(e);
    }
};
function TabstripItem(text, contentUrl, url, params) {
    this.Text = text;
    this.ContentUrl = contentUrl;
    this.UrlController = url;
    this.Index = -1;
    this.Visible = true;
    this.loadingState = false;
    this.Params = params;
}
function WindowItem(title, contentUrl, ctrl, option, closeable, paramId) {
    this.Title = title;
    this.ContentUrl = contentUrl;
    this.Controller = ctrl;
    this.Options = option;
    this.Maximizable = false;
    this.Maximizable = false;
    if (closeable == null)
        this.Closeable = true;
    else
        this.Closeable = closeable;
    this.Params = paramId;
    this.loadingState = false;
    this.Warning = '';
    this.WarningId = '';
}
function PartialMessageStorage(count) {
    this.Count = count;
    this.MessageData = "";
    this.CurrentIndex = -1;
}
PartialMessageStorage.prototype.appendMessage = function (data, index, count) {
    if (this.Count != count) {
        console.error("Invalid message size");
        return null;
    }
    if (index < 0 || index >= this.Count) {
        console.error("Invalid message index");
        return null;
    }
    if ((this.CurrentIndex + 1) != index) {
        return false;
    }
    this.CurrentIndex = index;
    this.MessageData += data;
    return index === count - 1;
};
function addTitle(columns, options) {
    for (var i = 0; i < columns.length; i++) {
        if (!columns[i].headerTooltip) columns[i].headerTooltip = columns[i].headerName;
        if (columns[i].valueGetter) continue;
        if (columns[i].children) {
            if (options) options.headerHeight = 30;
            addTitle(columns[i].children);
        }
        if (!columns[i].cellRenderer) {
            columns[i].cellRenderer = function (params) {
                if (!params.data || params.data[params.colDef.field] == null) {
                    if (params.value) return params.value;
                    return null;
                }
                var span = document.createElement("span");
                span.textContent = params.data[params.colDef.field];
                span.title = params.data[params.colDef.field];
                return span;
            };
        }
        else if (!columns[i].func) {
            if (columns[i].cellRenderer.renderer && columns[i].cellRenderer.renderer === "group") {
                if (columns[i].cellRenderer.innerRenderer) {
                    columns[i].func = columns[i].cellRenderer.innerRenderer;
                    columns[i].cellRenderer.innerRenderer = function (params) {
                        var cell = params.colDef.func(params);
                        if (cell && !cell.title) {
                            if (params.node && params.node.data)
                                cell.title = params.data[params.colDef.field];
                            else
                                cell.title = cell.innerText;
                        }
                        return cell;
                    };
                }
            } else {
                columns[i].func = columns[i].cellRenderer;
                columns[i].cellRenderer = function (params) {
                    if (!params.data) return null;
                    var cell = params.colDef.func(params);
                    if (cell) {
                        if (!cell.title && params.data[params.colDef.field]) cell.title = params.data[params.colDef.field];
                        return cell;
                    }
                    return null;
                };
            }
        }
    }
}
function AngularGridOptions(columns, name, onSelectCallback, unAutoCol, isCollapse) {
    this.headerHeight = 40;
    addTitle(columns, this);
    if (columns.length > 2 && !columns[0].pinned) columns[0].pinned = "left";
    this.name = name;
    this.columnDefs = columns;
    this.rowData = null;
    this.rowHeight = 26;
    this.rowBuffer = 30;
    this.enableColResize = true;
    this.enableSorting = true;
    this.enableFilter = true;
    this.rowSelection = 'single';
    this.groupDefaultExpanded = isCollapse ? -1 : 9999;
    this.showToolPanel = false;
    this.groupSuppressAutoColumn = true;
    this.isgroupSuppressAutoColumn = true;
    this.groupColumnDef = null; // doesn't matter, won't get used anyway
    if (onSelectCallback) {
        this.onRowSelected = onSelectCallback;
    }
    if (!this.onGridReady) {
        var opt = this;
        this.onGridReady = function () {
            if (opt && opt.api) {

                var lstHeadser = opt.api.gridPanel.eHeader.getElementsByClassName("ag-header-cell-text");

                //anh.nguyen autoWidth column with header
                if (!opt.api.columnController.normaliseColumnWidthOld) {
                    opt.api.columnController.normaliseColumnWidthOld = opt.api.columnController.normaliseColumnWidth;
                    opt.api.columnController.normaliseColumnWidth = function (column, newWidth) {
                        for (var i = 0; i < lstHeadser.length; i++) {
                            if (lstHeadser[i].textContent === column.colDef.headerName) {
                                lstHeadser[i].style.maxWidth = "none";
                                lstHeadser[i].style.float = "left";
                                var width = lstHeadser[i].clientWidth + 6;
                                lstHeadser[i].style.float = "";
                                lstHeadser[i].style.maxWidth = null;
                                if (width > newWidth) newWidth = width;
                                break;
                            }
                        }
                        return opt.api.columnController.normaliseColumnWidthOld(column, newWidth);
                    };
                }

                //anh.nguyen auto excute sizeColumnsToFit
                if (!opt.api.columnController.autoSizeColumnsOld) {
                    opt.api.columnController.autoSizeColumnsOld = opt.api.columnController.autoSizeColumns;
                    opt.api.columnController.autoSizeColumns = function (keys) {
                        opt.api.columnController.autoSizeColumnsOld(keys);
                        if (keys.length <= 1) return;
                        var totalWith = 0;
                        for (var j = 0; j < keys.length; j++) totalWith += keys[j].actualWidth;
                        if (totalWith < opt.api.gridPanel.getWidthForSizeColsToFit()) opt.api.sizeColumnsToFit();
                    };
                }

                if (!opt.api.setRowDataOld) {
                    opt.api.setRowDataOld = opt.api.setRowData;
                    opt.api.setRowData = function () {
                        opt.api.setRowDataOld(opt.rowData);
                        if ($appMonitor.isLock) return;
                        if (opt.rowData && opt.rowData.length) {
                            var itemHide = opt.api.gridPanel.eBody;
                            while (true) {
                                itemHide = itemHide.parentElement;
                                if (itemHide.className.indexOf("tab-pane") > -1 || itemHide.className.indexOf("ng-hide") > -1 || itemHide.clientWidth) break;
                            }
                            if (!itemHide.clientWidth) {
                                var oldClass = itemHide.className;
                                itemHide.className = oldClass + " force";
                                if (itemHide.parentElement.className.indexOf("tab-content") > -1) {
                                    var oldClass2 = itemHide.parentElement.className;
                                    itemHide.parentElement.className = oldClass2 + " overFlow";
                                    opt.api.columnController.autoSizeAllColumns();
                                    itemHide.parentElement.className = oldClass2;
                                }
                                else opt.api.columnController.autoSizeAllColumns();
                                itemHide.className = oldClass;
                            }
                            else opt.api.columnController.autoSizeAllColumns();
                        }
                    };
                }
                setTimeout(opt.api.setRowData, 100);
            }

        };
    };
}
function RealtimeEntity(entity, action, actor, time) {
    this.Entity = entity;
    this.EntityAction = action;
    this.Actor = actor;
    this.LastUpdate = time;
}
function Layout() {
    this.DockingLayout = null;
    this.UserSettings = null;
    this.DicGridSetting = null;
}
function DockingLayout() {
    this.MainTabstripItems = null;
    this.PrivateTabstripItems = null;
    this.PriceTabstripItems = null;
    this.ListPopupWindows = null;
    this.TabPosition = null;//vi tri luu du lieu, key la ten tab, neu = true la main, false la private
}
function ClientInfo() {
    this.Language = "vi_VN";
    this.Layout = 1;
    this.IdleRefreshInterval = 1000;
    this.IdleThreadsHold = 15 * 60 * 1000;
    this.IdleIsLockApp = false;
    this.Layout = "";
    this.MainPanelSize = 686;
    this.PrivatePanelSize = 300;
    this.PricePanelSize = 300;
    this.MainPanelCollapsed = false;
    this.PrivatePanelCollapsed = false;
    this.PricePanelCollapsed = false;
}
function AlertItem(type, msg) {
    this.Type = type;
    this.Msg = msg;
}
function RequestActionLogRange(name, start, end, userId) {
    this.ObjName = name;
    this.StartTime = start;
    this.EndTime = end;
    this.UserId = userId; //=null hoac =0 la toan he thong, con lai la nguoi dung cu the
}
this.$_setData = function (dataRef, mode, fields, fieldUpdates, values) {
    // anh.nguyen
    // value: là 1 bản ghi hoặc 1 list các bản ghi
    // mode = Mode.New (nạp dữ liệu mới), Mode.Override (ghi đè hoặc thêm mới), Mode.Update (cập nhật dữ liệu), Mode.Delete (xóa)
    // fields: là list các khóa chính để thao tác
    if (!dataRef) return;
    if (!Array.isArray(dataRef)) dataRef = [dataRef];
    if (!Array.isArray(fields)) fields = [fields];

    var data = $func.clone(dataRef); //Neu khong xu ly 3 kieu tren thi clone du lieu
    if (!data.length && mode && mode !== Mode.New ) return;
    if (mode === Mode.Override) {
        this.__overrideData(data, fields);
    } else if (mode === Mode.Delete) {
        this.__deleteData(data, fields);
    } else if (mode === Mode.Update) {
        this.__updateData(data, fields, fieldUpdates);
    } else if (mode === Mode.SetValue) {
        this.__setValue(data, fields, fieldUpdates, values);
    } else {
        this.rowData = this.$_sort ? data.sort(this.$_sort) : data;
        this.api.setRowData();
    }
}