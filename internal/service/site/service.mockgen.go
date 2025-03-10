// Code generated by MockGen. DO NOT EDIT.
// Source: internal/service/site/service.go
//
// Generated by this command:
//
//	mockgen -source=internal/service/site/service.go -destination internal/service/site/service.mockgen.go -package=site
//

// Package site is a generated GoMock package.
package site

import (
	context "context"
	reflect "reflect"

	v1 "github.com/ch3nnn/webstack-go/api/v1"
	gin "github.com/gin-gonic/gin"
	gomock "go.uber.org/mock/gomock"
)

// MockService is a mock of Service interface.
type MockService struct {
	ctrl     *gomock.Controller
	recorder *MockServiceMockRecorder
	isgomock struct{}
}

// MockServiceMockRecorder is the mock recorder for MockService.
type MockServiceMockRecorder struct {
	mock *MockService
}

// NewMockService creates a new mock instance.
func NewMockService(ctrl *gomock.Controller) *MockService {
	mock := &MockService{ctrl: ctrl}
	mock.recorder = &MockServiceMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockService) EXPECT() *MockServiceMockRecorder {
	return m.recorder
}

// BatchCreate mocks base method.
func (m *MockService) BatchCreate(ctx context.Context, req *v1.SiteCreateReq) (*v1.SiteCreateResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "BatchCreate", ctx, req)
	ret0, _ := ret[0].(*v1.SiteCreateResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// BatchCreate indicates an expected call of BatchCreate.
func (mr *MockServiceMockRecorder) BatchCreate(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "BatchCreate", reflect.TypeOf((*MockService)(nil).BatchCreate), ctx, req)
}

// Delete mocks base method.
func (m *MockService) Delete(ctx context.Context, req *v1.SiteDeleteReq) (*v1.SiteDeleteResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", ctx, req)
	ret0, _ := ret[0].(*v1.SiteDeleteResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Delete indicates an expected call of Delete.
func (mr *MockServiceMockRecorder) Delete(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockService)(nil).Delete), ctx, req)
}

// Export mocks base method.
func (m *MockService) Export(ctx *gin.Context, req *v1.SiteExportReq) (*v1.SiteExportResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Export", ctx, req)
	ret0, _ := ret[0].(*v1.SiteExportResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Export indicates an expected call of Export.
func (mr *MockServiceMockRecorder) Export(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Export", reflect.TypeOf((*MockService)(nil).Export), ctx, req)
}

// List mocks base method.
func (m *MockService) List(ctx context.Context, req *v1.SiteListReq) (*v1.SiteListResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "List", ctx, req)
	ret0, _ := ret[0].(*v1.SiteListResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// List indicates an expected call of List.
func (mr *MockServiceMockRecorder) List(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "List", reflect.TypeOf((*MockService)(nil).List), ctx, req)
}

// Sync mocks base method.
func (m *MockService) Sync(ctx *gin.Context, req *v1.SiteSyncReq) (*v1.SiteSyncResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Sync", ctx, req)
	ret0, _ := ret[0].(*v1.SiteSyncResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Sync indicates an expected call of Sync.
func (mr *MockServiceMockRecorder) Sync(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Sync", reflect.TypeOf((*MockService)(nil).Sync), ctx, req)
}

// Update mocks base method.
func (m *MockService) Update(ctx *gin.Context, req *v1.SiteUpdateReq) (*v1.SiteUpdateResp, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Update", ctx, req)
	ret0, _ := ret[0].(*v1.SiteUpdateResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Update indicates an expected call of Update.
func (mr *MockServiceMockRecorder) Update(ctx, req any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Update", reflect.TypeOf((*MockService)(nil).Update), ctx, req)
}

// i mocks base method.
func (m *MockService) i() {
	m.ctrl.T.Helper()
	m.ctrl.Call(m, "i")
}

// i indicates an expected call of i.
func (mr *MockServiceMockRecorder) i() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "i", reflect.TypeOf((*MockService)(nil).i))
}
