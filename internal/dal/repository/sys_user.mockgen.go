// Code generated by MockGen. DO NOT EDIT.
// Source: internal/dal/repository/sys_user.go
//
// Generated by this command:
//
//	mockgen -source=internal/dal/repository/sys_user.go -destination internal/dal/repository/sys_user.mockgen.go -package=repository
//

// Package repository is a generated GoMock package.
package repository

import (
	context "context"
	reflect "reflect"
	time "time"

	model "github.com/ch3nnn/webstack-go/internal/dal/model"
	gomock "go.uber.org/mock/gomock"
	gen "gorm.io/gen"
	field "gorm.io/gen/field"
)

// MockISysUserDao is a mock of ISysUserDao interface.
type MockISysUserDao struct {
	ctrl     *gomock.Controller
	recorder *MockISysUserDaoMockRecorder
	isgomock struct{}
}

// MockISysUserDaoMockRecorder is the mock recorder for MockISysUserDao.
type MockISysUserDaoMockRecorder struct {
	mock *MockISysUserDao
}

// NewMockISysUserDao creates a new mock instance.
func NewMockISysUserDao(ctrl *gomock.Controller) *MockISysUserDao {
	mock := &MockISysUserDao{ctrl: ctrl}
	mock.recorder = &MockISysUserDaoMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockISysUserDao) EXPECT() *MockISysUserDaoMockRecorder {
	return m.recorder
}

// WhereByCreatedAt mocks base method.
func (m *MockISysUserDao) WhereByCreatedAt(createdAt time.Time) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByCreatedAt", createdAt)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByCreatedAt indicates an expected call of WhereByCreatedAt.
func (mr *MockISysUserDaoMockRecorder) WhereByCreatedAt(createdAt any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByCreatedAt", reflect.TypeOf((*MockISysUserDao)(nil).WhereByCreatedAt), createdAt)
}

// WhereByDeletedAt mocks base method.
func (m *MockISysUserDao) WhereByDeletedAt(deletedAt time.Time) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByDeletedAt", deletedAt)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByDeletedAt indicates an expected call of WhereByDeletedAt.
func (mr *MockISysUserDaoMockRecorder) WhereByDeletedAt(deletedAt any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByDeletedAt", reflect.TypeOf((*MockISysUserDao)(nil).WhereByDeletedAt), deletedAt)
}

// WhereByID mocks base method.
func (m *MockISysUserDao) WhereByID(id int) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByID", id)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByID indicates an expected call of WhereByID.
func (mr *MockISysUserDaoMockRecorder) WhereByID(id any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByID", reflect.TypeOf((*MockISysUserDao)(nil).WhereByID), id)
}

// WhereByPassword mocks base method.
func (m *MockISysUserDao) WhereByPassword(password string) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByPassword", password)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByPassword indicates an expected call of WhereByPassword.
func (mr *MockISysUserDaoMockRecorder) WhereByPassword(password any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByPassword", reflect.TypeOf((*MockISysUserDao)(nil).WhereByPassword), password)
}

// WhereByUpdatedAt mocks base method.
func (m *MockISysUserDao) WhereByUpdatedAt(updatedAt time.Time) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByUpdatedAt", updatedAt)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByUpdatedAt indicates an expected call of WhereByUpdatedAt.
func (mr *MockISysUserDaoMockRecorder) WhereByUpdatedAt(updatedAt any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByUpdatedAt", reflect.TypeOf((*MockISysUserDao)(nil).WhereByUpdatedAt), updatedAt)
}

// WhereByUsername mocks base method.
func (m *MockISysUserDao) WhereByUsername(username string) func(gen.Dao) gen.Dao {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WhereByUsername", username)
	ret0, _ := ret[0].(func(gen.Dao) gen.Dao)
	return ret0
}

// WhereByUsername indicates an expected call of WhereByUsername.
func (mr *MockISysUserDaoMockRecorder) WhereByUsername(username any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WhereByUsername", reflect.TypeOf((*MockISysUserDao)(nil).WhereByUsername), username)
}

// WithContext mocks base method.
func (m *MockISysUserDao) WithContext(ctx context.Context) iCustomGenSysUserFunc {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "WithContext", ctx)
	ret0, _ := ret[0].(iCustomGenSysUserFunc)
	return ret0
}

// WithContext indicates an expected call of WithContext.
func (mr *MockISysUserDaoMockRecorder) WithContext(ctx any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "WithContext", reflect.TypeOf((*MockISysUserDao)(nil).WithContext), ctx)
}

// MockiCustomGenSysUserFunc is a mock of iCustomGenSysUserFunc interface.
type MockiCustomGenSysUserFunc struct {
	ctrl     *gomock.Controller
	recorder *MockiCustomGenSysUserFuncMockRecorder
	isgomock struct{}
}

// MockiCustomGenSysUserFuncMockRecorder is the mock recorder for MockiCustomGenSysUserFunc.
type MockiCustomGenSysUserFuncMockRecorder struct {
	mock *MockiCustomGenSysUserFunc
}

// NewMockiCustomGenSysUserFunc creates a new mock instance.
func NewMockiCustomGenSysUserFunc(ctrl *gomock.Controller) *MockiCustomGenSysUserFunc {
	mock := &MockiCustomGenSysUserFunc{ctrl: ctrl}
	mock.recorder = &MockiCustomGenSysUserFuncMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockiCustomGenSysUserFunc) EXPECT() *MockiCustomGenSysUserFuncMockRecorder {
	return m.recorder
}

// Create mocks base method.
func (m_2 *MockiCustomGenSysUserFunc) Create(m *model.SysUser) (*model.SysUser, error) {
	m_2.ctrl.T.Helper()
	ret := m_2.ctrl.Call(m_2, "Create", m)
	ret0, _ := ret[0].(*model.SysUser)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Create indicates an expected call of Create.
func (mr *MockiCustomGenSysUserFuncMockRecorder) Create(m any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).Create), m)
}

// Delete mocks base method.
func (m *MockiCustomGenSysUserFunc) Delete(whereFunc ...func(gen.Dao) gen.Dao) error {
	m.ctrl.T.Helper()
	varargs := []any{}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "Delete", varargs...)
	ret0, _ := ret[0].(error)
	return ret0
}

// Delete indicates an expected call of Delete.
func (mr *MockiCustomGenSysUserFuncMockRecorder) Delete(whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).Delete), whereFunc...)
}

// DeletePhysical mocks base method.
func (m *MockiCustomGenSysUserFunc) DeletePhysical(whereFunc ...func(gen.Dao) gen.Dao) error {
	m.ctrl.T.Helper()
	varargs := []any{}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "DeletePhysical", varargs...)
	ret0, _ := ret[0].(error)
	return ret0
}

// DeletePhysical indicates an expected call of DeletePhysical.
func (mr *MockiCustomGenSysUserFuncMockRecorder) DeletePhysical(whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DeletePhysical", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).DeletePhysical), whereFunc...)
}

// FindAll mocks base method.
func (m *MockiCustomGenSysUserFunc) FindAll(whereFunc ...func(gen.Dao) gen.Dao) ([]*model.SysUser, error) {
	m.ctrl.T.Helper()
	varargs := []any{}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "FindAll", varargs...)
	ret0, _ := ret[0].([]*model.SysUser)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindAll indicates an expected call of FindAll.
func (mr *MockiCustomGenSysUserFuncMockRecorder) FindAll(whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindAll", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).FindAll), whereFunc...)
}

// FindCount mocks base method.
func (m *MockiCustomGenSysUserFunc) FindCount(whereFunc ...func(gen.Dao) gen.Dao) (int64, error) {
	m.ctrl.T.Helper()
	varargs := []any{}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "FindCount", varargs...)
	ret0, _ := ret[0].(int64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindCount indicates an expected call of FindCount.
func (mr *MockiCustomGenSysUserFuncMockRecorder) FindCount(whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindCount", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).FindCount), whereFunc...)
}

// FindOne mocks base method.
func (m *MockiCustomGenSysUserFunc) FindOne(whereFunc ...func(gen.Dao) gen.Dao) (*model.SysUser, error) {
	m.ctrl.T.Helper()
	varargs := []any{}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "FindOne", varargs...)
	ret0, _ := ret[0].(*model.SysUser)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindOne indicates an expected call of FindOne.
func (mr *MockiCustomGenSysUserFuncMockRecorder) FindOne(whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindOne", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).FindOne), whereFunc...)
}

// FindPage mocks base method.
func (m *MockiCustomGenSysUserFunc) FindPage(page, pageSize int, orderColumns []field.Expr, whereFunc ...func(gen.Dao) gen.Dao) ([]*model.SysUser, int64, error) {
	m.ctrl.T.Helper()
	varargs := []any{page, pageSize, orderColumns}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "FindPage", varargs...)
	ret0, _ := ret[0].([]*model.SysUser)
	ret1, _ := ret[1].(int64)
	ret2, _ := ret[2].(error)
	return ret0, ret1, ret2
}

// FindPage indicates an expected call of FindPage.
func (mr *MockiCustomGenSysUserFuncMockRecorder) FindPage(page, pageSize, orderColumns any, whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]any{page, pageSize, orderColumns}, whereFunc...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindPage", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).FindPage), varargs...)
}

// Scan mocks base method.
func (m *MockiCustomGenSysUserFunc) Scan(result any, whereFunc ...func(gen.Dao) gen.Dao) error {
	m.ctrl.T.Helper()
	varargs := []any{result}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "Scan", varargs...)
	ret0, _ := ret[0].(error)
	return ret0
}

// Scan indicates an expected call of Scan.
func (mr *MockiCustomGenSysUserFuncMockRecorder) Scan(result any, whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]any{result}, whereFunc...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Scan", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).Scan), varargs...)
}

// ScanPage mocks base method.
func (m *MockiCustomGenSysUserFunc) ScanPage(page, pageSize int, orderColumns []field.Expr, result any, whereFunc ...func(gen.Dao) gen.Dao) (int64, error) {
	m.ctrl.T.Helper()
	varargs := []any{page, pageSize, orderColumns, result}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "ScanPage", varargs...)
	ret0, _ := ret[0].(int64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ScanPage indicates an expected call of ScanPage.
func (mr *MockiCustomGenSysUserFuncMockRecorder) ScanPage(page, pageSize, orderColumns, result any, whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]any{page, pageSize, orderColumns, result}, whereFunc...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ScanPage", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).ScanPage), varargs...)
}

// Update mocks base method.
func (m *MockiCustomGenSysUserFunc) Update(v any, whereFunc ...func(gen.Dao) gen.Dao) (int64, error) {
	m.ctrl.T.Helper()
	varargs := []any{v}
	for _, a := range whereFunc {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "Update", varargs...)
	ret0, _ := ret[0].(int64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Update indicates an expected call of Update.
func (mr *MockiCustomGenSysUserFuncMockRecorder) Update(v any, whereFunc ...any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]any{v}, whereFunc...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Update", reflect.TypeOf((*MockiCustomGenSysUserFunc)(nil).Update), varargs...)
}
